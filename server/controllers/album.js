//
// Album Controller
//

//var Promise = require("bluebird");
//var models = require('../models/index');
var AlbumDao = require("../models/dao/albumDao");
var AlbumNotFoundError = require("./errors/albumErrors").AlbumNotFoundError;
var ServerError = require("./errors/genericErrors").ServerError;

// GET - Return an album by id
exports.getAlbumById = function(req, res) {

	AlbumDao.getAlbumById(req.params.id)
		.then(function (result) {
			res.status(200).json(result);	
		})
		.catch(AlbumNotFoundError, function (error) {
			res.status(error.statusCode).json(error);
		})
		.catch(function (error) {
			var errorObj = new ServerError(error.message);
			res.status(errorObj.statusCode).json(errorObj);
		});
};

// GET - Return all albums
exports.getAlbums = function(req, res) {
 var options = {};
 if (req.query.order){
   options.order = req.query.order;
 }

 if (req.query.limit){
   options.limit = req.query.limit;
 }
 if (req.query.offset){
   options.offset = req.query.offset;
 }

	AlbumDao.getAlbums(options)
		.then(function (albums) {
			res.status(200).json(albums);
		})
		.catch(function (error) {
			var errorObj = new ServerError(error.message);
			res.status(errorObj.statusCode).json(errorObj);
		});
};

// PUT - Update one reg already exists
exports.updateAlbum = function(req, res) {
	
	// 
	var album = { 
	  name: req.body.name,
	  year: req.body.year,
	  GenreId: req.body.GenreId	};

	AlbumDao.updateAlbum(album)
		.then(function (result) {
			res.status(200).json(result);
		})
		.catch(AlbumNotFoundError, function (error) {
			res.status(error.statusCode).json(error);
		})
		.catch(function (error) {
			var errorObj = new ServerError(error.message);
			res.status(errorObj.statusCode).json(errorObj);
		});
};


