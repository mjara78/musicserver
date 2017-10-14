//
// Login Controller
//
var randomstring = require("randomstring");
 
var UserDao = require("../models/dao/userDao");
var UserPassNotFound = require("./errors/userErrors").UserPassNotFound;
var ServerError = require("./errors/genericErrors").ServerError;
var security = require("../utils/security");

// GET - Return an album by id
exports.loginUser = function(req, res) {

    UserDao.getUserByNamePass(req.body.name, req.body.password)
        .then(function(user) {
            var token = security.createToken(user.id);
            
            user.lastLogin = new Date();
            
            UserDao.updateUser({
                                 id: user.id,
                                 lastLogin: user.lastLogin,
                                 isAdmin: user.isAdmin
                               });
            
            res.status(200).json({
                token: token,
                user: {
                    name: user.name,
                    isAdmin: user.isAdmin,
                    lastLogin: user.lastLogin
                }
            });
        })
        .catch(UserPassNotFound, function(error) {
            res.status(error.statusCode).json(error);
        })
        .catch(function(error) {
            var errorObj = new ServerError(error.message);
            res.status(errorObj.statusCode).json(errorObj);
        });
};

// GET - Return count albums
exports.getCountUsers = function(req, res) {
    var options = {};
    var filter = {};
    
    if (req.query.isAdmin) {
        filter.isAdmin = req.query.isAdmin;
    }

    UserDao.getCountUsers(options, filter)
        .then(function(count) {
            res.status(200).json(count);
        })
        .catch(function(error) {
            var errorObj = new ServerError(error.message);
            res.status(errorObj.statusCode).json(errorObj);
        });
};

// POST - Create default admin user
exports.createDefaultUser = function(req, res) {
    var pass = randomstring.generate(8);
    
    console.log("Creating admin user with pass: " + pass);
    
    var user = {
      name: 'admin',
      password: pass,
      isAdmin: true
    };

    UserDao.createUser(user)
        .then(function(result) {
            res.status(200).json(result.id);
        })
        .catch(function(error) {
            var errorObj = new ServerError(error.message);
            res.status(errorObj.statusCode).json(errorObj);
        });
};