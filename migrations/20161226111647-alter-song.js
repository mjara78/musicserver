'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
     return queryInterface.addColumn ('Songs', 'file_path', Sequelize.STRING)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn ('Songs','file_path');
  }
};
