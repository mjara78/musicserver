'use strict';
module.exports = function(sequelize, DataTypes) {
  var Library = sequelize.define('Library', {
    base_dir: DataTypes.STRING,
    num_elements: DataTypes.INTEGER,
    state: DataTypes.STRING,
    last_refresh: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Library;
}; 