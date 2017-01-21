//
// Library Controller
//

var Promise = require("bluebird");
var LibraryDao = require("../models/dao/libraryDao");
var GenreDao = require("../models/dao/genreDao");
var LibraryRefreshingError = require("./errors/libraryErrors").LibraryRefreshingError;
var LibraryNotBaseDirError = require("./errors/libraryErrors").LibraryNotBaseDirError;

// GET - Return library
exports.getLibrary = function(req, res) {

	LibraryDao.getLibrary()
		.then( function (library) {
			res.status(200).json(library);
		})
		.catch(function (error) {
			res.status(500).json(error.message);
		});
};

// PUT - Update one reg already exists
exports.updateLibrary = function(req, res) {
	
	// only update base_dir
	var library = { base_dir: req.body.base_dir	};

	LibraryDao.updateLibrary(library)
		.then(function (result) {
			if (result) {
				res.status(200).json(result);
			} else {
				res.status(404).json('Library not found.');	
			}
		})
		.catch(function (error) {
			res.status(500).json(error.message);
		});
};

//POST - Refresh Library content
exports.refreshLibrary = function(req, res) {
  
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
    	res.status(500).json(error.message);
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
			
			var Scanner = require("../utils/scanner");
			var scanner = new Scanner();
			var elements = 0;
		  
			console.time("Library Update ends");
		
			// Now scan base_dir
			scanner.scan(library.base_dir, function (filePath, stat) {
				
		    	elements++;
		    	
			    readMusicFile(filePath, stat);
			});
			
			// call when scan finished
			scanner.on('end', function () {
				console.log("Files readed: " + elements);
				console.timeEnd("Library Update ends");
				
				// compose library object for update
				var library = {
					num_elements: elements,
		    		state: 'updated',
		    		last_refresh: new Date()
				};
				
				// update library when scan finished, then do nothing
				LibraryDao.updateLibrary(library).then(function () {}).catch(reject);
			});
			
			// return library
			resolve(library);
			
		})
	}
}; 

function readMusicFile(filePath, stat) {
	var fs = require('fs');
	var mm = require('musicmetadata');
	
	var readableStream = fs.createReadStream(filePath);
	var parser = mm(readableStream, function (err, metadata) {
		if (err) throw err;
		var genre;
		
		if (metadata.genre.length > 0) {
			genre = metadata.genre[0];	
		}
		else {
			genre = 'no genre';
		}
		
		GenreDao.getOrCreateGenreByName(genre).then().catch(function (error) {
			readableStream.close();
			return console.error(error.message);
		});
		
		readableStream.close();
	});
	
}