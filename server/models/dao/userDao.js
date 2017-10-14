//
// User DAO
//

var Promise = require("bluebird");
var models = require('../../models/index');
var UserPassNotFound = require("../../controllers/errors/userErrors").UserPassNotFound;
var User = models.User;

var me = exports;

// Returns an Album by id
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