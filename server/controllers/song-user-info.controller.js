//
// SongUserInfo Controller
//

var SongUserInfoDao = require("../models/dao/song-user-infoDao");
var SongFileNotFoundError = require("./errors/songErrors").SongFileNotFoundError;
var ServerError = require("./errors/genericErrors").ServerError;
var NotFoundError = require("./errors/genericErrors").NotFoundError;
const GenericController = require("./generic.controller");


module.exports = class SongUserInfoController extends GenericController {
  constructor() {
    super(new SongUserInfoDao())
	}

	updateSongInfoByUser(req, res) {
	  let info = { 
	    playcount: req.body.playcount,
	    like: req.body.like,
	    dislike: req.body.dislike
	  };
	  
		 this.dao.updateSongInfoByUser(req.params.id, req.user, info)
			 .then(function (result) {
				 res.status(200).json(result);
			 })
			 .catch(function (error) {
				 var errorObj = new ServerError(error.message);
				 console.error(error)
				 res.status(errorObj.statusCode).json(errorObj);
			 });
	 }
}
