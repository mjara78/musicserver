//
// Album DAO
//

var Promise = require("bluebird");
var models = require('../../models/index');
var Album = models.Album;
var Artist = models.Artist;
var AlbumNotFoundError = require("../../controllers/errors/albumErrors").AlbumNotFoundError;
var musicArt = require("../../utils/music-art");

var me = exports;  

// Returns an Album by id
exports.getAlbumById = function getAlbumById (idAlbum) {
    return new Promise(function (resolve, reject) {
        Album.findById(idAlbum).then(function (result) {
        	if (result) {
        		resolve(result);
        	} else {
        		throw new AlbumNotFoundError();
        	}
        }).catch(reject);
    });
};

// Returns all Albums
exports.getAlbums = function getAlbums (options) {
    return new Promise(function (resolve, reject) {
        options.include = [Artist];
        Album.findAll(options).then(resolve).catch(reject);
    });
};

// Get or Create an Album by Name
exports.getOrCreateAlbumByName = function getOrCreateAlbumByName (album) {
    return new Promise(function (resolve, reject) {
        Album.find({
	    	where: { name: album.name }
	    }).then(function (result) {
			if (result) {
				resolve(result);
			} else { // album not exists
			  musicArt.getImages(album.artistName, album.name) // Get images of album
					.then( function (images){ // Create album when get images
					
			   	Album.create({
			   		name: album.name,
		   			year: album.year,
	   				GenreId: album.GenreId,
	  	 			ArtistId: album.ArtistId,
	  	 			imageUrlSmall: images.imageUrlSmall,
       imageUrlLarge: images.imageUrlLarge,
       imageUrlExtralarge: images.imageUrlExtralarge
		   		})
			  	.then(resolve)
		  		.catch(reject);
		  	})
			}
	    }).catch(reject);
    });
};

// Update Album name by id
exports.updateAlbum = function updateAlbum (album) {
	return new Promise(function (resolve, reject) {
		
    Album.update(
			{ name: album.name,
			  year: album.year,
			  GenreId: album.GenreId },
			{ where: { id: album.id }}
		)
		.then(function (idAlbum) {
			if (idAlbum) {
				me.getAlbumById(idAlbum).then(resolve).catch(reject);
			} else {
				throw new AlbumNotFoundError();
			}
		})
		.catch(reject);    
  });
};