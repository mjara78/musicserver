//
// Song DAO
//

var Promise = require("bluebird");
var models = require('../../models/index');
var Song = models.Song;
var Artist = models.Artist;
var Album = models.Album;
var SongNotFoundError = require("../../controllers/errors/songErrors").SongNotFoundError;

var me = exports;  

// Returns a Song by id
exports.getSongById = function getSongById (idSong) {
    return new Promise(function (resolve, reject) {
        Song.findById(idSong).then(function (result) {
        	if (result) {
        		resolve(result);
        	} else {
        		throw new SongNotFoundError();
        	}
        }).catch(reject);
    });
};

// Returns all Song
exports.getSongs = function getSongs () {
    return new Promise(function (resolve, reject) {
        Song.findAll().then(resolve).catch(reject);
    });
};

// Get a Song by File Path
exports.getSongByFilePath = function getSongByFilePath (filePath) {
    return new Promise(function (resolve, reject) {
        Song.find({
	    	where: { file_path: filePath }
	    }).then(function (song) {
			if (song) {
				resolve(song);
			} else { // filePath not exists
				throw new SongNotFoundError();
			}
	    }).catch(reject);
    });
};

// Create Song
exports.createSong = function createSong(song) {
	return new Promise(function (resolve, reject) {
	    Song.create({
	        title: song.title,
            year: song.year,
            track: song.track,
            // comment: DataTypes.STRING,
            duration: song.duration,
            file_path: song.file_path,
            last_sync: song.last_sync,
			AlbumId: song.AlbumId,
			ArtistId: song.ArtistId,
			albumArtistId: song.albumArtistId,
			GenreId: song.GenreId
	    })
	    .then(resolve)
	    .catch(reject);
	});
};

// Returns all Song by album id
exports.getSongsByAlbum = function getSongsByAlbum (options) {
    return new Promise(function (resolve, reject) {
        options.include = [Album, Artist];
        Song.findAll(options).then(resolve).catch(reject);
    });
};

