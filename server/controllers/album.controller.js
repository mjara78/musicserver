//
// Album Controller
//

//var Promise = require("bluebird");
var AlbumDao = require("../models/dao/albumDao");
var ServerError = require("./errors/genericErrors").ServerError;
const GenericController = require("./generic.controller");
const NotFoundError = require("./errors/genericErrors").NotFoundError;


module.exports = class AlbumController extends GenericController {
  constructor() {
    super(new AlbumDao())
  }

  // GET - Return all albums
  getAlbums(req, res) {
	   this.dao.getAlbums(this.parseParams(req))
		  .then(function (albums) {
		    	res.status(200).json(albums);
	  	})
		  .catch(function (error) {
    			var errorObj = new ServerError(error.message);
          console.error(error)
	    		res.status(errorObj.statusCode).json(errorObj);
   		});
  }

  getAlbumById(req, res) {
    let options = { include: [ { type: 'Artist' }] }

	   this.dao.getById(req.params.id, options)
  		.then( (result) => {
     			res.status(200).json(result);	
	  	})
  		.catch(NotFoundError, (error) => {
	   		res.status(error.statusCode).json(error);
  		})
  		.catch( (error) => {
   			var errorObj = new ServerError(error.message);
     console.error(error)
	   		res.status(errorObj.statusCode).json(errorObj);
		  });
  }
}

/*
// GET - Return an album by id
exports.getAlbumById = function(req, res) {

	albumDao.getById(req.params.id)
		.then(function (result) {
			res.status(200).json(result);	
		})
		.catch(NotFoundError, function (error) {
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
 var filter = {};
 
 if (req.query.order){
   options.order = req.query.order;
   if(req.query.orderType){
     options.orderType = req.query.orderType
   }
 }

 if (req.query.limit){
   options.limit = req.query.limit;
 }
 if (req.query.offset){
   options.offset = req.query.offset;
 }
 if (req.query.name) {
   filter.name = req.query.name;
 }
//console.log(options)
	albumDao.getAlbums(options, filter)
		.then(function (albums) {
			res.status(200).json(albums);
		})
		.catch(function (error) {
			var errorObj = new ServerError(error.message);
   console.error(error)
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

	albumDao.update(album)
		.then(function (result) {
			res.status(200).json(result);
		})
		.catch(NotFoundError, function (error) {
			res.status(error.statusCode).json(error);
		})
		.catch(function (error) {
			var errorObj = new ServerError(error.message);
			res.status(errorObj.statusCode).json(errorObj);
		});
};

// GET - Return count albums
exports.getCountAlbums = function(req, res) {
    var options = {};
    var filter = {};
    
    if (req.query.limit) {
        options.limit = req.query.limit;
    }
    if (req.query.offset) {
        options.offset = req.query.offset;
    }
    if (req.query.name) {
        filter.name = req.query.name;
    }

    albumDao.getCountAlbums(options, filter)
        .then(function(count) {
            res.status(200).json(count);
        })
        .catch(function(error) {
            var errorObj = new ServerError(error.message);
            res.status(errorObj.statusCode).json(errorObj);
        });
};

*/
