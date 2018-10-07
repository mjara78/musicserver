//
// Song Controller
//

var SongDao = require("../models/dao/songDao");
var SongFileNotFoundError = require("./errors/songErrors").SongFileNotFoundError;
var ServerError = require("./errors/genericErrors").ServerError;
var NotFoundError = require("./errors/genericErrors").NotFoundError;
var ms = require("mediaserver");
const GenericController = require("./generic.controller");


module.exports = class SongController extends GenericController {
  constructor() {
    super(new SongDao())
	}
	
	getSongById(req, res) {
		this.dao.getSongById(req.params.id, true, req.user)
		.then(function (result) {
			//console.log(result)
			res.status(200).json(result);	
		})
		.catch(NotFoundError, function (error) {
			res.status(error.statusCode).json(error);
		})
		.catch(function (error) {
			var errorObj = new ServerError(error.message);
			console.error(error);
			res.status(errorObj.statusCode).json(errorObj);
		});
	}

	getSongsByAlbum(req, res) {	 
	 this.dao.getSongsByAlbum(this.parseParams(req), req.user, req.params.idAlbum)
			 .then(function (songs) {
				 res.status(200).json(songs);
			 })
			 .catch(function (error) {
				 var errorObj = new ServerError(error.message);
				 console.error(error);
				 res.status(errorObj.statusCode).json(errorObj);
			 });
	 }

	 getSongStream(req, res) {
		this.dao.getSongById(req.params.id, false)
			.then(function (song) {
			 // Stream file 
			 ms.pipe(req, res, song.filePath);
	
			})
			.catch(NotFoundError, function (error) {
				res.status(error.statusCode).json(error);
			})
			.catch(SongFileNotFoundError, function (error) {
				res.status(error.statusCode).json(error);
			})
			.catch(function (error) {
				var errorObj = new ServerError(error.message);
				console.error(error)
				res.status(errorObj.statusCode).json(errorObj);
			});
	}

	getSongs(req, res) {
		 this.dao.getSongs(this.parseParams(req), req.user)
			 .then(function (songs) {
				 res.status(200).json(songs);
			 })
			 .catch(function (error) {
				 var errorObj = new ServerError(error.message);
				 console.error(error)
				 res.status(errorObj.statusCode).json(errorObj);
			 });
	 }
}

/*

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


*/