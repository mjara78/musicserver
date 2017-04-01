'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn ('Libraries', 'state', Sequelize.STRING)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn ('Libraries','state')
  }
};
