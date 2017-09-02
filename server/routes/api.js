var express = require('express');

// API Controllers
var LibraryCtrl = require("../controllers/library.js");
var GenreCtrl = require("../controllers/genre.js");
var AlbumCtrl = require("../controllers/album.js");
var SongCtrl = require("../controllers/song.js");
var ArtistCtrl = require("../controllers/artist.js");


// API routes
var router = express.Router();

// Library
router.route('/library')
    .get(LibraryCtrl.getLibrary)
    .put(LibraryCtrl.updateLibrary)
    .post(LibraryCtrl.refreshLibrary);

// Albums
router.route('/albums/:id([0-9])')
    .get(AlbumCtrl.getAlbumById)
    .put(AlbumCtrl.updateAlbum);

router.route('/albums')
    .get(AlbumCtrl.getAlbums);
    
router.route('/albums/count')
    .get(AlbumCtrl.getCountAlbums);

router.route('/albums/:idAlbum/songs')
    .get(SongCtrl.getSongsByAlbum);

// Songs

// Genres
router.route('/genres/:id')
    .get(GenreCtrl.getGenreById)
    .put(GenreCtrl.updateGenre);

router.route('/genres')
    .get(GenreCtrl.getGenres);

// Artist
router.route('/artists/:id([0-9])')
    .get(ArtistCtrl.getArtistById)
    .put(ArtistCtrl.updateArtist);

router.route('/artists')
    .get(ArtistCtrl.getArtists);
    
router.route('/artists/count')
    .get(ArtistCtrl.getCountArtists);

module.exports = router;