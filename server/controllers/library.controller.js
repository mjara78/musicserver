//
// Library Controller
//

var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));
var LibraryDao = require("../models/dao/libraryDao");
var GenreDao = require("../models/dao/genreDao");
var ArtistDao = require("../models/dao/artistDao");
var AlbumDao = require("../models/dao/albumDao");
var SongDao = require("../models/dao/songDao");
var LibraryRefreshingError = require("./errors/libraryErrors").LibraryRefreshingError;
var LibraryNotBaseDirError = require("./errors/libraryErrors").LibraryNotBaseDirError;
var SongNotFoundError = require("./errors/songErrors").SongNotFoundError;
var ServerError = require("./errors/genericErrors").ServerError;
var ConflictError = require("./errors/genericErrors").ConflictError;
var LibraryNotFoundError = require("./errors/libraryErrors").LibraryNotFoundError;
var NotFoundError = require("./errors/genericErrors").NotFoundError;
var path = require('path');


var libraryDao = new LibraryDao()
var artistDao = new ArtistDao()
var albumDao = new AlbumDao()
var songDao = new SongDao()
var genreDao = new GenreDao()

// GET - Return library
exports.getLibrary = async function getLibrary(req, res) {
 try {
   const library = await libraryDao.getById(1)
   return res.status(200).json(library);  
 } catch (error) {
   if( error.statusCode === 404) {
     const lib = await libraryDao.create({
              id: 1,
              baseDir: null,
	    		      		 state: 'updated',
	    				      numElements: 0,
	    				      lastRefresh: null 
            })
            
     return res.status(200).json(lib); 
   } else {
     var errorObj = new ServerError(error.message);
     console.error(error)
	  		return res.status(errorObj.statusCode).json(errorObj);
   }
 }
};

// PUT - Update one reg already exists
exports.updateLibrary = async function updateLibrary(req, res) {
	
	const library = req.body;
	
	try {	
	  const result = await libraryDao.update(library);	
	    
	  return res.status(200).json(result);	  
	  	  
	} catch(error) {	
	  const errorObj = new ServerError(error.message);
   console.error(error); 
     
	  return res.status(errorObj.statusCode).json(errorObj);
	}
	
	
};

//POST - Refresh Library content
exports.refreshLibrary = async function refreshLibrary(req, res) {
 try {
   let library = await libraryDao.getById(1);
	  library = await lockLibrary(library);
	  library = await scanBaseDir(library);
	
	  return res.status(200).json(library);
 } catch(error) {
   const errorObj = new ServerError(error.message);
   console.error(error); 
     
	  return res.status(errorObj.statusCode).json(errorObj);
 }
	
  function lockLibrary (library){
    return new Promise (function (resolve, reject) {
			
       	if (library.baseDir) { // base_dir not null
				   if (library.state != 'updating0000') {	
				     // Test if base_dir exists
				     fs.readdirAsync(library.baseDir)
				       .then(function(){
				          // update library content
			        			// first change state of library
				       			library.state = 'updating';	
			       				return libraryDao.update(library).then(resolve).catch(reject);
				       }) 
				       .catch(reject);
				       
				} else { // library updating 
					throw new LibraryRefreshingError();
				}	
			} else { // base_dir not defined
				throw new LibraryNotBaseDirError();
			}	
      
   })
   }
  
	function scanBaseDir (library) {
		return new Promise (function (resolve, reject) {
			
			var scanner = require("../utils/scan");
			
			var elements = 0;

			console.log("Update library...");
  	console.time("Library Update ends");

			// Scan base_dir
			var extract = scanner.extractMetadata(library.baseDir, function (filePath, tags){
				return new Promise (function  (resolve, reject){
	//		console.log("+++Insert in DB: "+filePath)		
					Promise.join(
					  genreDao.getOrCreateGenreByName(tags.genre),
					  artistDao.getOrCreateArtistByName(tags.albumArtist, tags.imageAlbumArtist, tags.musicbrainz_albumartistid),
					  function (genre, albumArtist) { // after create genre and albumArtist we can create album
					    var album = {
						     	albumName: tags.album,
							    year: tags.year,
					     		GenreId: genre.id,
					     		ArtistId: albumArtist.id,
					     		artistName: albumArtist.artistName,
           path: path.dirname(filePath)
						   }
						   
					    Promise.join(
					      albumDao.getOrCreateAlbumByName(album),
					      artistDao.getOrCreateArtistByName(tags.artist, tags.imageArtist, tags.musicbrainz_artistid),
					      function ( album, artist){ // after create album and artist we can create song
				       		// Create Song
				       		var song = {
				   		      	title: tags.title,
				          		year: tags.year,
				          		track: tags.track,
               disk: tags.disk,
				          		duration: tags.duration,
               comment: tags.comment,
               bitrate: tags.bitrate,
				          		filePath: filePath,
				          		lastSync: new Date(),
					        	songAlbumId: album.id,
				        		songArtistId: artist.id,
				        		songGenreId: genre.id
				      		};
				 		
			    	  		return songDao.create(song)
				       		.then(function (res) {
			        	 			elements ++;
				         			resolve(elements);
			     	 		})
				 	     	.catch(reject);
					      }
					    );
					  }
					);
					
			//		console.log('#' + elements +'- Filename:' + filePath + ' => Genre:' + tags.genre + ' => Artist:' + tags.artist+ ' => Album:' + tags.album + ' => Title:' + tags.title);
				});
			});
			
			// call when scan finished
			extract.then( function (elements){
				console.log("Files readed: " + elements);
				console.timeEnd("Library Update ends");

				// compose library object for update
    library.numElements = library.numElements + elements;
    library.state = 'updated';
    library.lastRefresh = new Date();

				// update library when scan finished, then do nothing
				return libraryDao.update(library)
     .then( (res) => {
       return resolve(library)
     })
     .catch( (err) => {
       console.error("error update:"+err)
       return reject(err)
     });
			});
			
			// return library
			return resolve(library);
		})
	} 
	
}

// Function for test if exists a song by filePath
exports.songExists = function (songFilePath){
	return new Promise( function (resolve, reject) {
		songDao.getSongByFilePath(songFilePath)
  	 	.then( (results) => {
       if(results.length > 0){
         resolve(true)
       } else {
         resolve(false)
       }
  	   	})
     	.catch(reject)
	})
}