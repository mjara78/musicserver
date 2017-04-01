'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn ('Songs','composer');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn ('Songs', 'composer', Sequelize.STRING)
  }
};