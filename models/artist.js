'use strict';
module.exports = function(sequelize, DataTypes) {
  var Artist = sequelize.define('Artist', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Artist.hasMany(models.Song, {as: 'artist_song'});
        Artist.hasMany(models.Song, {as: 'composer_song'});
      }
    }
  });
  return Artist;
};