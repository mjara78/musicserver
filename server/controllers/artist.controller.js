//
// Artist Controller
//

var ArtistDao = require("../models/dao/artistDao");
const GenericController = require("./generic.controller");

module.exports = class AlbumController extends GenericController {
    constructor() {
      super(new ArtistDao())
    }
    
    // GET - Return all artists
    getArtists(req, res) {
		    let options = this.parseArtistParams(req);
	     this.dao.getAllFilter(this.parseParams(req, options))
		    .then(function (artists) {
		      	return res.status(200).json(artists);
	    	})
		    .catch(function (error) {
    	  		var errorObj = new ServerError(error.message);
        console.error(error)
	    		  return res.status(errorObj.statusCode).json(errorObj);
   	  	});
    }
    
    parseArtistParams(req) {
      let options = {}
      if (req.query.artistName) {
        options.filter = {}
        options.filter.artistName = req.query.artistName;
      }
    
      return options;
    }
}  

