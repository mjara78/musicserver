'use strict';
module.exports = function(sequelize, DataTypes) {
  var Song = sequelize.define('Song', {
    title: DataTypes.STRING,
    year: DataTypes.STRING,
    track: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    file_path: DataTypes.STRING,
    last_sync: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Song.belongsTo(models.Album);
        Song.belongsTo(models.Artist);
        Song.belongsTo(models.Artist, {as: 'album_artist' });
        Song.belongsTo(models.Genre);
      }
    }
  });
  return Song;
};