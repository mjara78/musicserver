'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: false, 
      allowNull: false, 
      set: function(value) { 
         if (value === 'true') {
           value = true;
         }
         if (value === 'false'){
           value = false;
         }  
         this.setDataValue('isAdmin', value); 
      } 
    },
    lastLogin: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.SongUser);
      }
    },
    indexes: [
       { 
         unique : true,
         fields: ['id']
       }
    ]
  });
  return User;
};