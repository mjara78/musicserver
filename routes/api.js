var express = require('express');

// API Controllers
var LibraryCtrl = require("../controllers/library.js");

// API routes
var router = express.Router();

// Library
router.route('/library')
  .get(LibraryCtrl.getLibrary)
  .put(LibraryCtrl.updateLibrary)
  .post(LibraryCtrl.refreshLibrary);
  
// Albums
//router.route('/tvshows/:id')
//  .get(TVShowCtrl.findById)
//  .put(TVShowCtrl.updateTVShow)
//  .delete(TVShowCtrl.deleteTVShow);

// Songs

// Genres

// Artist

module.exports = router;