'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn ('Songs','album');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn ('Songs', 'album', Sequelize.STRING)
  }
};
