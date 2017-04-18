//
// Library Controller
//

var Promise = require("bluebird");
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
							// update library content
							// first change state of library
							library.state = 'updating';
							LibraryDao.updateLibrary(library).then(resolve).catch(reject);
					
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
					
					// Search or Create Genre
					var promiseGenre = GenreDao.getOrCreateGenreByName(tags.genre);
					
					// When Genre found then search or create Album
					promiseGenre.then(function (genre) {
						var album = {
							name: tags.album,
							year: tags.year,
							GenreId: genre.id
						}
						// Sync promises
						Promise.join(ArtistDao.getOrCreateArtistByName(tags.artist), // Search or Create Artist
									 ArtistDao.getOrCreateArtistByName(tags.albumArtist), // Search or Create Album Artist
									 AlbumDao.getOrCreateAlbumByName(album), // Search or create Album
									 function (artist, albumArtist, album) {
									 	// get song
									 	SongDao.getSongByFilePath(filePath)
									 	.then()
									 	.catch(SongNotFoundError, function (error) {
									 		
									 		// Create Song
									 		var song = {
									 			title: tags.title,
									            year: tags.year,
									            track: tags.track,
									            // comment: DataTypes.STRING,
									            duration: tags.duration,
									            file_path: filePath,
									            last_sync: new Date(),
												AlbumId: album.id,
												ArtistId: artist.id,
												albumArtistId: albumArtist.id,
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
									 	
						});
					})
					.catch(reject);
					
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
