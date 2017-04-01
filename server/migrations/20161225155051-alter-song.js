'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn ('Songs','album_artist');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn ('Songs', 'album_artist', Sequelize.STRING)
  }
};