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
var LibraryNotFoundError = require("./errors/libraryErrors").LibraryNotFoundError;

// GET - Return library
exports.getLibrary = function getLibrary(req, res) {

	LibraryDao.getLibrary()
		.then( function (library) {
			res.status(200).json(library);
		})
		.catch(function (error) {
			var errorObj = new ServerError(error.message);
			res.status(errorObj.statusCode).json(errorObj);
		});
};

// PUT - Update one reg already exists
exports.updateLibrary = function updateLibrary(req, res) {
	
	// only update base_dir
	var library = { base_dir: req.body.base_dir	};

	LibraryDao.updateLibrary(library)
		.then(function (result) {
			if (result) {
				res.status(200).json(result);
			} else {
			 var errorObj = new LibraryNotFoundError();
				res.status(errorObj.statusCode).json(errorObj);	
			}
		})
		.catch(function (error) {
		 var errorObj = new ServerError(error.message);
			res.status(errorObj.statusCode).json(errorObj);
		});
};

//POST - Refresh Library content
exports.refreshLibrary = function refreshLibrary(req, res) {
  
	LibraryDao.getLibrary()
    .then(lockLibrary)
    .then(scanBaseDir)
	.then(function (library) {
		// return OK
		res.status(200).json(library);
	})
	.catch(LibraryRefreshingError, function (error) {
		res.status(error.statusCode).json(error);
	})
	.catch(LibraryNotBaseDirError, function (error) {
		res.status(error.statusCode).json(error);
	})
    .catch( function(error){
    	var errorObj = new ServerError(error.message);
			  res.status(errorObj.statusCode).json(errorObj);
		});
	
  function lockLibrary (library){
    return new Promise (function (resolve, reject) {
			
       	if (library.base_dir) { // base_dir not null
				   if (library.state != 'updating') {	
				     // Test if base_dir exists
				     fs.readdirAsync(library.base_dir)
				       .then(function(){
				          // update library content
			        			// first change state of library
				       			library.state = 'updating';
			       				LibraryDao.updateLibrary(library).then(resolve).catch(reject);
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
			
			var elements = library.num_elements;

			console.log("Update library...");
  			console.time("Library Update ends");

			// Scan base_dir
			var extract = scanner.extractMetadata(library.base_dir, function (filePath, tags){
				return new Promise (function  (resolve, reject){
					
					Promise.join(
					  GenreDao.getOrCreateGenreByName(tags.genre),
					  ArtistDao.getOrCreateArtistByName(tags.albumArtist),
					  function (genre, albumArtist) { // after create genre and albumArtist we can create album
					    var album = {
						     	name: tags.album,
							     year: tags.year,
					     		GenreId: genre.id,
					     		ArtistId: albumArtist.id,
					     		artistName: albumArtist.name
						   }
						   
					    Promise.join(
					      AlbumDao.getOrCreateAlbumByName(album),
					      ArtistDao.getOrCreateArtistByName(tags.artist),
					      function ( album, artist){ // after create album and artist we can create song
					        // get song
									 	   SongDao.getSongByFilePath(filePath)
									  	   .then()
									     	.catch(SongNotFoundError, function (error) { // if song not found create it
									  		
									       		// Create Song
									       		var song = {
									   		      title: tags.title,
									          year: tags.year,
									          track: tags.track,
									          duration: tags.duration,
									          file_path: filePath,
									          last_sync: new Date(),
										        		AlbumId: album.id,
									        			ArtistId: artist.id,
									        			GenreId: genre.id
									      		};
									 		
								    	  		SongDao.createSong(song)
									       		.then(function (song) {
								        	 			elements ++;
									         			resolve(elements);
								     	 		})
									 	     	.catch(reject);
									    	})
									 	   .catch(reject);
					      }
					    );
					  }
					);
					
					//console.log('Filename:' + filePath + ' => Genre:' + tags.genre);
				});
			});
			
			// call when scan finished
			extract.then( function (elements){
				console.log("Files readed: " + elements);
				console.timeEnd("Library Update ends");

				// compose library object for update
				var library = {
					num_elements: elements,
		    		state: 'updated',
		    		last_refresh: new Date()
				};
				
				// update library when scan finished, then do nothing
				LibraryDao.updateLibrary(library).catch(reject);
			});
			
			// return library
			resolve(library);
		})
	} 
}
