'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn ('Songs', 'last_sync', Sequelize.DATE)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn ('Songs','last_sync');
  }
};
