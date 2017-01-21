//
// Genre DAO
//

var Promise = require("bluebird");
var models = require('../../models/index');
var Genre = models.Genre;
var GenreNotFoundError = require("../../controllers/errors/genreErrors").GenreNotFoundError;

var me = exports;  

// Returns a Genre by id
exports.getGenreById = function (idGenre) {
    return new Promise(function (resolve, reject) {
        Genre.findById(idGenre).then(function (result) {
        	if (result) {
        		resolve(result);
        	} else {
        		throw new GenreNotFoundError();
        	}
        }).catch(reject);
    });
};

// Returns all Genres
exports.getGenres = function () {
    return new Promise(function (resolve, reject) {
        Genre.findAll().then(resolve).catch(reject);
    });
};

// Get or Create a Genre by Name
exports.getOrCreateGenreByName = function (genre) {
    return new Promise(function (resolve, reject) {
        Genre.findOrCreate({
	    	where: { name: genre }
	    }).then(function (result) {
	    	// result contains the genre and one boolean indicanting if was create  
	    	resolve(result[0]); 
	    }).catch(reject);
    });
};

// Update Genre name by id
exports.updateGenre = function (genre) {
	return new Promise(function (resolve, reject) {
		
    Genre.update(
			{ name: genre.name },
			{ where: { id: genre.id } }
		)
		.then(function (idGenre) {
			if (idGenre) {
				me.getGenreById(idGenre).then(resolve).catch(reject);
			} else {
				throw new GenreNotFoundError();
			}
		})
		.catch(reject);    
  });
};