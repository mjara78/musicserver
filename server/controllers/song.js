//
// Song Controller
//

var SongDao = require("../models/dao/songDao");
var SongNotFoundError = require("./errors/songErrors").SongNotFoundError;
var ServerError = require("./errors/genericErrors").ServerError;

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
 
 options.where = {
   AlbumId : req.params.idAlbum
 };

	SongDao.getSongsByAlbum(options)
		.then(function (songs) {
			res.status(200).json(songs);
		})
		.catch(function (error) {
			var errorObj = new ServerError(error.message);
			res.status(errorObj.statusCode).json(errorObj);
		});
};




