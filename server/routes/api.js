var express = require('express');

// API Controllers
var LibraryCtrl = require("../controllers/library.controller");
var GenreCtrl = require("../controllers/genre.controller");
var AlbumCtrl = require("../controllers/album.controller");
var SongCtrl = require("../controllers/song.controller");
var ArtistCtrl = require("../controllers/artist.controller");
var UserCtrl = require("../controllers/user.controller");
var SongUserInfoCtrl = require("../controllers/song-user-info.controller");

var ensureAuthenticated = require("../utils/security").ensureAuthenticated;
var ensureAdminUser = require("../utils/security").ensureAdminUser;
// API routes
var router = express.Router();

var albumCtrl = new AlbumCtrl();
var userCtrl = new UserCtrl(); 
var artistCtrl = new ArtistCtrl();
var songCtrl = new SongCtrl();
var songUserInfoCtrl = new SongUserInfoCtrl();

// Authentication 
router.route('/login').post(userCtrl.loginUser.bind(userCtrl));
router.route('/users/count').get(userCtrl.getCountFilter.bind(userCtrl));
router.route('/users/default').post(userCtrl.createDefaultUser.bind(userCtrl));

// Users
router.route('/users')
    .get(ensureAuthenticated, ensureAdminUser, userCtrl.getAllFilter.bind(userCtrl))
    .post(ensureAuthenticated, ensureAdminUser, userCtrl.create.bind(userCtrl));

router.route('/users/bulkdelete').post(ensureAuthenticated, ensureAdminUser, userCtrl.delete.bind(userCtrl));

// Library
router.route('/library')
    .get(ensureAuthenticated, LibraryCtrl.getLibrary)
    .put(ensureAuthenticated, LibraryCtrl.updateLibrary)
    .post(ensureAuthenticated, LibraryCtrl.refreshLibrary);

router.route('/library/:id(\\d+)')
    .put(ensureAuthenticated, LibraryCtrl.updateLibrary);

// Albums
router.route('/albums/:id([a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12})')
    .get(ensureAuthenticated, albumCtrl.getAlbumById.bind(albumCtrl))
    .put(ensureAuthenticated, albumCtrl.update.bind(albumCtrl));

router.route('/albums')
    //.get(ensureAuthenticated, AlbumCtrl.getAlbums);
	.get(albumCtrl.getAlbums.bind(albumCtrl));

router.route('/albums/count')
    .get(ensureAuthenticated, albumCtrl.getCountFilter.bind(albumCtrl));

router.route('/albums/:idAlbum([a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12})/songs')
    .get(ensureAuthenticated, songCtrl.getSongsByAlbum.bind(songCtrl));

// Songs
router.route('/songs/:id([a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12})/stream')
    .get(songCtrl.getSongStream.bind(songCtrl));
    
router.route('/songs/:id([a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12})/userinfo')
    .put(ensureAuthenticated, songUserInfoCtrl.updateSongInfoByUser.bind(songUserInfoCtrl));
    
router.route('/songs')
    .get(ensureAuthenticated, songCtrl.getSongs.bind(songCtrl));

// Genres
router.route('/genres/:id([a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12})')
    .get(ensureAuthenticated, GenreCtrl.getGenreById)
    .put(ensureAuthenticated, GenreCtrl.updateGenre);

router.route('/genres')
    .get(ensureAuthenticated, GenreCtrl.getGenres);

// Artist
router.route('/artists/:id([a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12})')
    .get(ensureAuthenticated, artistCtrl.getById.bind(artistCtrl))
    .put(ensureAuthenticated, artistCtrl.update.bind(artistCtrl));

router.route('/artists')
    .get(ensureAuthenticated, artistCtrl.getArtists.bind(artistCtrl));

router.route('/artists/count')
    .get(ensureAuthenticated, artistCtrl.getCountFilter.bind(artistCtrl));

module.exports = router;