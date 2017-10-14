'use strict';
module.exports = function(sequelize, DataTypes) {
    var Artist = sequelize.define('Artist', {
        name: DataTypes.STRING,
        imageUrlSmall: DataTypes.STRING,
        imageUrlLarge: DataTypes.STRING,
        imageUrlExtralarge: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Artist.hasMany(models.Song, { as: 'artist_song' });
                Artist.hasMany(models.Song, { as: 'composer_song' });
                Artist.hasMany(models.Album);
            }
        },
        indexes: [
          {
            unique: true, 
            fields: ['id']
          },
          { 
           fields: ['name']
          }
        ]
    });
    return Artist;
};