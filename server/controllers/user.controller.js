//
// User Controller
//
var randomstring = require("randomstring");
 
var UserDao = require("../models/dao/userDao");
var UserPassNotFound = require("./errors/userErrors").UserPassNotFound;
var ServerError = require("./errors/genericErrors").ServerError;
var security = require("../utils/security");

// GET - Return an user by id
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

// GET - Return count users
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

// GET - Return all users
exports.getUsers = function(req, res) {
 var options = {};
 var filter = {};
 
 if (req.query.order){
   options.order = req.query.order;
 }

 if (req.query.limit){
   options.limit = req.query.limit;
 }
 if (req.query.offset){
   options.offset = req.query.offset;
 }
 if (req.query.name) {
   filter.name = req.query.name;
 }

    UserDao.getUsers(options, filter)
        .then(function (users) {
            res.status(200).json(users);
        })
        .catch(function (error) {
            var errorObj = new ServerError(error.message);
            res.status(errorObj.statusCode).json(errorObj);
        });
};

// POST - Create new user
exports.createUser = function(req, res) {
    
    UserDao.createUser(req.body)
        .then(function(result) {
            res.status(200).json(result.id);
        })
        .catch(function(error) {
            var errorObj = new ServerError(error.message);
            res.status(errorObj.statusCode).json(errorObj);
        });
};

// DELETE - Delete users
exports.deleteUsers = function(req, res) {
    
    UserDao.deleteUsers(req.body.ids)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(error) {
            var errorObj = new ServerError(error.message);
            res.status(errorObj.statusCode).json(errorObj);
        });
};