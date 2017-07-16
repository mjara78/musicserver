var express = require('express');
var Promise = require("bluebird");
var ms = require("mediaserver");
var router = express.Router();
var SongDao = require("../models/dao/songDao");
var SongNotFoundError = require("../controllers/errors/songErrors").SongNotFoundError;
var SongFileNotFoundError = require("../controllers/errors/songErrors").SongFileNotFoundError;
var ServerError = require("../controllers/errors/genericErrors").ServerError;


/* Listen music */
router.get('/:id', function(req, res, next) {
  
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
      
});

module.exports = router;