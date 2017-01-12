'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn ('Albums','genre');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn ('Albums', 'genre', Sequelize.STRING)
  }
};
