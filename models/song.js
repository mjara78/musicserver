'use strict';
module.exports = function(sequelize, DataTypes) {
  var Song = sequelize.define('Song', {
    title: DataTypes.STRING,
    year: DataTypes.STRING,
    track: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    length: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Song.belongsTo(models.Album);
        Song.belongsTo(models.Artist, {as: 'song_artist'});
        Song.belongsTo(models.Artist, {as: 'composer' });
        Song.belongsTo(models.Genre);
      }
    }
  });
  return Song;
};