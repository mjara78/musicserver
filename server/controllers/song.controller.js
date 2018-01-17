//
// Song Controller
//

var SongDao = require("../models/dao/songDao");
var SongNotFoundError = require("./errors/songErrors").SongNotFoundError;
var SongFileNotFoundError = require("./errors/songErrors").SongFileNotFoundError;
var ServerError = require("./errors/genericErrors").ServerError;
var ms = require("mediaserver");

// GET - Return an album by id
exports.getSongById = function(req, res) {

	SongDao.getSongById(req.params.id)
		.then(function (result) {
			res.status(200).json(result);	
		})
		.catch(SongNotFoundError, function (error) {
			res.status(error.statusCode).json(error);
		})
		.catch(function (error) {
			var errorObj = new ServerError(error.message);
			res.status(errorObj.statusCode).json(errorObj);
		});
};

// GET - Return all songs
exports.getSongsByAlbum = function(req, res) {
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

	SongDao.getSongsByAlbum(options, req.params.idAlbum, req.user)
		.then(function (songs) {
			res.status(200).json(songs);
		})
		.catch(function (error) {
			var errorObj = new ServerError(error.message);
			res.status(errorObj.statusCode).json(errorObj);
		});
};

// GET - Return song stream
exports.getSongStream = function(req, res) {

	SongDao.getSongById(req.params.id)
		.then(function (song) {
	   
	   // Stream file 
	   ms.pipe(req, res, song.file_path);

		})
		.catch(SongNotFoundError, function (error) {
			res.status(error.statusCode).json(error);
		})
		.catch(SongFileNotFoundError, function (error) {
			res.status(error.statusCode).json(error);
		})
		.catch(function (error) {
			var errorObj = new ServerError(error.message);
			res.status(errorObj.statusCode).json(errorObj);
		});
};

// PUT - Update song info for logged user user
exports.updateSongInfoByUser = function(req, res) {
	
	var info = { 
	  playcount: req.body.playcount,
	  like: req.body.like,
	  dislike: req.body.dislike	}

	SongDao.updateSongInfoByUser(req.params.id, req.user, info)
		.then(function (result) {
			res.status(200).json(result);
		})
		.catch(function (error) {
			var errorObj = new ServerError(error.message);
			res.status(errorObj.statusCode).json(errorObj);
		});
};



