//
// Artist Controller
//

var ArtistDao = require("../models/dao/artistDao");
var ArtistNotFoundError = require("./errors/artistErrors").ArtistNotFoundError;
var ServerError = require("./errors/genericErrors").ServerError;

// GET - Return an artist by id
exports.getArtistById = function(req, res) {

    ArtistDao.getArtistById(req.params.id)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(ArtistNotFoundError, function(error) {
            res.status(error.statusCode).json(error);
        })
        .catch(function(error) {
            var errorObj = new ServerError(error.message);
            res.status(errorObj.statusCode).json(errorObj);
        });
};

// GET - Return all artist
exports.getArtists = function(req, res) {
    var options = {};
    if (req.query.order) {
        options.order = req.query.order;
    }

    if (req.query.limit) {
        options.limit = req.query.limit;
    }
    if (req.query.offset) {
        options.offset = req.query.offset;
    }

    ArtistDao.getArtists(options)
        .then(function(artists) {
            res.status(200).json(artists);
        })
        .catch(function(error) {
            var errorObj = new ServerError(error.message);
            res.status(errorObj.statusCode).json(errorObj);
        });
};

// PUT - Update one reg already exists
exports.updateArtist = function(req, res) {

    // 
    var artist = {
        name: req.body.name,
    };

    ArtistDao.updateArtist(artist)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(ArtistNotFoundError, function(error) {
            res.status(error.statusCode).json(error);
        })
        .catch(function(error) {
            var errorObj = new ServerError(error.message);
            res.status(errorObj.statusCode).json(errorObj);
        });
};