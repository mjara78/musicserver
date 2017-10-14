'use strict';
module.exports = function(sequelize, DataTypes) {
  var Album = sequelize.define('Album', {
    name: DataTypes.STRING,
    year: DataTypes.STRING,
    imageUrlSmall: DataTypes.STRING,
    imageUrlLarge: DataTypes.STRING,
    imageUrlExtralarge: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Album.hasMany(models.Song);
        Album.belongsTo(models.Genre);
        Album.belongsTo(models.Artist);
      }
    },
    indexes: [
       { 
         unique : true,
         fields: ['id']
       },
       {
         fields:['GenreId']
       },
       {
         fields:['ArtistId']
       },
       {
         fields:['name']
       }
    ]
  });
  return Album;
};