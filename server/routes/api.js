var express = require('express');

// API Controllers
var LibraryCtrl = require("../controllers/library.controller");
var GenreCtrl = require("../controllers/genre.controller");
var AlbumCtrl = require("../controllers/album.controller");
var SongCtrl = require("../controllers/song.controller");
var ArtistCtrl = require("../controllers/artist.controller");
var UserCtrl = require("../controllers/user.controller");

var ensureAuthenticated = require("../utils/security").ensureAuthenticated;
var ensureAdminUser = require("../utils/security").ensureAdminUser;
// API routes
var router = express.Router();

// Authentication 
router.route('/login').post(UserCtrl.loginUser);
router.route('/users/count').get(UserCtrl.getCountUsers);
router.route('/users/default').post(UserCtrl.createDefaultUser);

// Users
router.route('/users')
    .get(ensureAuthenticated, ensureAdminUser, UserCtrl.getUsers)
    .post(ensureAuthenticated, ensureAdminUser, UserCtrl.createUser);

router.route('/users/bulkdelete').post(ensureAuthenticated, ensureAdminUser, UserCtrl.deleteUsers);

// Library
router.route('/library')
    .get(ensureAuthenticated, LibraryCtrl.getLibrary)
    .put(ensureAuthenticated, LibraryCtrl.updateLibrary)
    .post(ensureAuthenticated, LibraryCtrl.refreshLibrary);

// Albums
router.route('/albums/:id(\\d+)')
    .get(ensureAuthenticated, AlbumCtrl.getAlbumById)
    .put(ensureAuthenticated, AlbumCtrl.updateAlbum);

router.route('/albums')
    .get(ensureAuthenticated, AlbumCtrl.getAlbums);

router.route('/albums/count')
    .get(ensureAuthenticated, AlbumCtrl.getCountAlbums);

router.route('/albums/:idAlbum/songs')
    .get(ensureAuthenticated, SongCtrl.getSongsByAlbum);

// Songs
router.route('/songs/:id/stream')
    .get(SongCtrl.getSongStream);
router.route('/songs/:id/userinfo')
    .put(ensureAuthenticated, SongCtrl.updateSongInfoByUser);

// Genres
router.route('/genres/:id')
    .get(ensureAuthenticated, GenreCtrl.getGenreById)
    .put(ensureAuthenticated, GenreCtrl.updateGenre);

router.route('/genres')
    .get(ensureAuthenticated, GenreCtrl.getGenres);

// Artist
router.route('/artists/:id([0-9])')
    .get(ensureAuthenticated, ArtistCtrl.getArtistById)
    .put(ensureAuthenticated, ArtistCtrl.updateArtist);

router.route('/artists')
    .get(ensureAuthenticated, ArtistCtrl.getArtists);

router.route('/artists/count')
    .get(ensureAuthenticated, ArtistCtrl.getCountArtists);

module.exports = router;