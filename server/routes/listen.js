var express = require('express');
var Promise = require("bluebird");
var fs = require("fs");
var router = express.Router();
var SongDao = require("../models/dao/songDao");
var SongNotFoundError = require("../controllers/errors/songErrors").SongNotFoundError;
var SongFileNotFoundError = require("../controllers/errors/songErrors").SongFileNotFoundError;
var ServerError = require("../controllers/errors/genericErrors").ServerError;


/* Listen music */
router.get('/:id', function(req, res, next) {
  
  SongDao.getSongById(req.params.id)
		.then(function (song) {
	    
	   fs.stat(song.file_path, function (err, stat){
	     
	       if (err){
	         throw new SongFileNotFoundError(err.message);
	       }
	       else{
	       
	         var range = Number(stat.size) - 1;
	         
	        // console.log("range " + range);
	      //   console.log("size " + stat.size);
	       
	         res.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Content-Length': stat.size ,
            'Accept-Ranges': 'bytes' ,
            'Content-Range': 'bytes 0-' + range + '/' + stat.size
          });

          var readStream = fs.createReadStream(song.file_path);
          readStream.pipe(res);
        }
	     })

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