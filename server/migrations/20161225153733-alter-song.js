'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn ('Songs','artist');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn ('Songs', 'artist', Sequelize.STRING)
  }
};
