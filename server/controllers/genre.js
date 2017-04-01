//
// Genre Controller
//

//var Promise = require("bluebird");
//var models = require('../models/index');
var GenreDao = require("../models/dao/genreDao");
var GenreNotFoundError = require("./errors/genreErrors").GenreNotFoundError;

// GET - Return a genre by id
exports.getGenreById = function(req, res) {

	GenreDao.getGenreById(req.params.id)
		.then(function (result) {
			res.status(200).json(result);	
		})
		.catch(GenreNotFoundError, function (error) {
			res.status(error.statusCode).json(error);
		})
		.catch(function (error) {
			res.status(500).json(error.message);
		});
};

// GET - Return all genres 
exports.getGenres = function(req, res) {

	GenreDao.getGenres()
		.then(function (genres) {
			res.status(200).json(genres);
		})
		.catch(function (error) {
			res.status(500).json(error.message);
		});
};

// PUT - Update one reg already exists
exports.updateGenre = function(req, res) {
	
	// only update name
	var genre = { name: req.body.name	};

	GenreDao.updateGenre(genre)
		.then(function (result) {
			res.status(200).json(result);
		})
		.catch(GenreNotFoundError, function (error) {
			res.status(error.statusCode).json(error);
		})
		.catch(function (error) {
			res.status(500).json(error.message);
		});
};


