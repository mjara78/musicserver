//
// Artist DAO
//

var Promise = require("bluebird");
var models = require('../../models/index');
var Artist = models.Artist;
var ArtistNotFoundError = require("../../controllers/errors/artistErrors").ArtistNotFoundError;
var musicArt = require("../../utils/music-art");

var me = exports;

// Returns a Artist by id
exports.getArtistById = function getArtistById(idArtist) {
    return new Promise(function(resolve, reject) {
        Artist.findById(idArtist).then(function(result) {
            if (result) {
                resolve(result);
            } else {
                throw new ArtistNotFoundError();
            }
        }).catch(reject);
    });
};

// Returns all Artists
exports.getArtists = function getArtists(options, filter) {
    if (filter.name){
      options.where = {
        name: {
          $like: '%' + filter.name + '%'
        }
      };
    }
    return new Promise(function(resolve, reject) {
        Artist.findAll(options).then(resolve).catch(reject);
    });
};

// Get or Create an Artist by Name
exports.getOrCreateArtistByName = function getOrCreateArtistByName(artistName) {
    return new Promise(function(resolve, reject) {
        Artist.find({
            where: { name: artistName }
        }).then(function(artist) {
            if (artist) {
                resolve(artist);
            } else { // artist not exists

                musicArt.getImages(artistName, null) // Get images of artist
                    .then(function(images) { // Create artist when get images

                        Artist.create({
                                name: artistName,
                                imageUrlSmall: images.imageUrlSmall,
                                imageUrlLarge: images.imageUrlLarge,
                                imageUrlExtralarge: images.imageUrlExtralarge
                            })
                            .then(resolve)
                            .catch(reject);
                    })
                    .catch(reject); // Error getting artist images
            }
        }).catch(reject);
    });
};

// Update Artist name by id
exports.updateArtist = function updateArtist(artist) {
    return new Promise(function(resolve, reject) {

        Artist.update({ name: artist.name }, { where: { id: artist.id } })
            .then(function(idArtist) {
                if (idArtist) {
                    me.getArtistById(idArtist).then(resolve).catch(reject);
                } else {
                    throw new ArtistNotFoundError();
                }
            })
            .catch(reject);
    });
};

// Returns count Artists
exports.getCountArtists = function getCountArtists(options, filter) {
    if (filter.name){
      options.where = {
        name: {
          $like: '%' + filter.name + '%'
        }
      };
    }
    return new Promise(function(resolve, reject) {
        Artist.count(options).then(resolve).catch(reject);
    });
};