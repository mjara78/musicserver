//
// Artist DAO
//

var Promise = require("bluebird");
var models = require('../../models/index');
var Artist = models.Artist;
var ArtistNotFoundError = require("../../controllers/errors/artistErrors").ArtistNotFoundError;

var me = exports;  

// Returns a Artist by id
exports.getArtistById = function getArtistById (idArtist) {
    return new Promise(function (resolve, reject) {
        Artist.findById(idArtist).then(function (result) {
        	if (result) {
        		resolve(result);
        	} else {
        		throw new ArtistNotFoundError();
        	}
        }).catch(reject);
    });
};

// Returns all Artist
exports.getArtist = function getArtist () {
    return new Promise(function (resolve, reject) {
        Artist.findAll().then(resolve).catch(reject);
    });
};

// Get or Create an Artist by Name
exports.getOrCreateArtistByName = function getOrCreateArtistByName (artistName) {
    return new Promise(function (resolve, reject) {
        Artist.find({
	    	where: { name: artistName }
	    }).then(function (artist) {
			if (artist) {
				resolve(artist);
			} else { // artist not exists
				Artist.create({
					name: artistName
				})
				.then(resolve)
				.catch(reject);
			}
	    }).catch(reject);
    });
};

// Update Artist name by id
exports.updateArtist = function updateArtist (artist) {
	return new Promise(function (resolve, reject) {
		
    Artist.update(
			{ name: artist.name },
			{ where: { id: artist.id } }
		)
		.then(function (idArtist) {
			if (idArtist) {
				me.getArtistById(idArtist).then(resolve).catch(reject);
			} else {
				throw new ArtistNotFoundError();
			}
		})
		.catch(reject);    
  });
};