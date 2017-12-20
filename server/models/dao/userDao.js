//
// User DAO
//

var Promise = require("bluebird");
var models = require('../../models/index');
var UserPassNotFound = require("../../controllers/errors/userErrors").UserPassNotFound;
var UserNotFound = require("../../controllers/errors/userErrors").UserNotFound;
var User = models.User;
var SongUser = models.SongUser;
var Sequelize = require('sequelize');

var me = exports;

// Returns a User by Name and password
exports.getUserByNamePass = function getUserByNamePass(name, password) {
    return new Promise(function(resolve, reject) {
        User.find({
            where: {
                name: name,
                password: password
            }
        }).then(function(result) {
            if (result) {
                resolve(result);
            } else {
                throw new UserPassNotFound();
            }
        }).catch(reject);
    });
};

exports.updateUser = function (user) {
	return new Promise(function (resolve, reject) {
		
    User.update(
			{ 
			  name: user.name,
			  password: user.password,
			  isAdmin: user.isAdmin,
			  lastLogin: user.lastLogin
		 },
			{  
			  where: { id: user.id }
			}
		)
		.then(function (result){
				resolve(user);
			})
		.catch(reject);    
  });
};

// Returns count Users
exports.getCountUsers = function getCountUsers(options, filter) {
    if (filter.isAdmin) {
        options.where = {
            isAdmin: (filter.isAdmin === 'true')
        };
    }
    return new Promise(function(resolve, reject) {
        User.count(options).then(resolve).catch(reject);
    });
};

// Create User
exports.createUser = function createUser(user) {
    return new Promise(function(resolve, reject) {
        User.create({
          name: user.name,
          password: user.password,
          isAdmin: user.isAdmin,
        }).then(resolve).catch(reject);
    });
};

// Returns all Users
exports.getUsers = function getUsers(options, filter) {
    if (filter.name) {
        options.where = {
            name: {
                $like: '%' + filter.name + '%'
            }
        };
    }
    
    options.attributes = ['id', 'name','isAdmin','lastLogin'];
    
    return new Promise(function(resolve, reject) {
        User.findAll(options).then(resolve).catch(reject);
    });
};

exports.deleteUsers = function (ids) {
    return new Promise(function (resolve, reject) {
    
    // Create transaction 
    return Sequelize.transaction(function (t) {
        // Delete first Song info for user
        return SongUser.destroy({
            where: { UserId: idUser },
            transaction: t })
        .then( function(result){
            // Delete User
            return User.destroy({
                 where: { id: idUser }, transaction: t 
            })
        })        
    })
    .then(function (result) {
        resolve(result)
    })
    .catch(reject) 
    });
};

// Returns a User by id
exports.getUserById = function getUserById(idUser) {
    return new Promise(function(resolve, reject) {
        User.findById(idUser).then(function(result) {
            if (result) {
                resolve(result);
            } else {
                throw new UserNotFound();
            }
        }).catch(reject);
    });
};