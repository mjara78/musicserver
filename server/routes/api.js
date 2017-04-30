var express = require('express');

// API Controllers
var LibraryCtrl = require("../controllers/library.js");
var GenreCtrl = require("../controllers/genre.js");
var AlbumCtrl = require("../controllers/album.js");


// API routes
var router = express.Router();

// Library
router.route('/library')
  .get(LibraryCtrl.getLibrary)
  .put(LibraryCtrl.updateLibrary)
  .post(LibraryCtrl.refreshLibrary);
  
// Albums
router.route('/albums/:id')
  .get(AlbumCtrl.getAlbumById)
  .put(AlbumCtrl.updateAlbum);
  
router.route('/albums')
  .get(AlbumCtrl.getAlbums);

// Songs

// Genres
router.route('/genres/:id')
  .get(GenreCtrl.getGenreById)
  .put(GenreCtrl.updateGenre);
  
router.route('/genres')
  .get(GenreCtrl.getGenres);


// Artist

module.exports = router;