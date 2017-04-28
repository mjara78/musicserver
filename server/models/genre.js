'use strict';
module.exports = function(sequelize, DataTypes) {
  var Genre = sequelize.define('Genre', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Genre.hasMany(models.Album);
        Genre.hasMany(models.Song);
      }
    }
  });
  return Genre;
};