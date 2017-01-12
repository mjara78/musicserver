// Library Controller

var models = require('../models/index');
var LibraryDao = require("../models/dao/libraryDao");

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

	var baseDir;
	
	LibraryDao.getLibrary().then(updateReadedLibrary);
	
	var scanUpdatedLibrary = function (error,result) {
		if (!error){
			// Now scan base_dir
			var Scanner = require("../utils/scanner");
			var scanner = new Scanner();
			var elements = 0;
		  
			console.time("Library Update ends");
		
			scanner.scan(baseDir, function (filePath, stat){
		    	elements++;
		      
			      //id3({ file: filePath, type: id3.OPEN_LOCAL }, function(err, tags) {
			      //    console.log('===>Track' + tags.track);
			      //    console.log('===>Title' + tags.title);
			      //    console.log('===>Album' + tags.album);
			      //    console.log('===>Artist' + tags.artist);
			      //});
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
				
				// update library
				LibraryDao.updateLibrary(library, function (error, updatedLibrary) {
					if (error) {
						console.log(error.message);
					} 
				})
			});
			
			// return OK
			res.status(200).json(result);
			
		} else { // error updating library state
			res.status(500).json(error.message);				
		}
	}
	
	var updateReadedLibrary = function (error, library) {
		
		if (!error) { // get library correctly
    		if (library.base_dir) { // base_dir not null
				if (library.state != 'updating') {
					
					// set base_dir
					baseDir = library.base_dir;	
					
					// update library content
					// first change state of library
					library.state = 'updating';
					LibraryDao.updateLibrary(library, scanUpdatedLibrary);
					
				} else { // library updating 
					res.status(418).json('Library already in refresh process, wait until finish.');
				}
				
			} else { // base_dir not defined
				res.status(418).json('base_dir not defined.');
			}	
			
    	} else { // Error reading library from DB
    		res.status(500).json(error.message);
    	}
	}

}; 

