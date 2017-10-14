'use strict';
module.exports = function(sequelize, DataTypes) {
  var SongUser = sequelize.define('SongUser', {
    UserId: { type: DataTypes.INTEGER, primaryKey: true},
    SongId: { type: DataTypes.INTEGER, primaryKey: true},
    playCount: DataTypes.INTEGER,
    like: DataTypes.BOOLEAN,
    dislike: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        SongUser.belongsTo(models.User);
        SongUser.belongsTo(models.Song);
      }
    },
    indexes: [
      { 
        unique: true,
        fields: ['UserId', 'SongId']
      }
    ]
  });
  return SongUser;
};