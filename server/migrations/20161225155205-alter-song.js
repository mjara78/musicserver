'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn ('Songs','genre');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn ('Songs', 'genre', Sequelize.STRING)
  }
};