// security.js
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config/security.config');
var AccessDeniedError = require("../controllers/errors/genericErrors").AccessDeniedError;
var UnauthorizedAccessError = require("../controllers/errors/genericErrors").UnauthorizedAccessError;
const UserDao = require("../models/dao/userDao");

var userDao = new UserDao()

exports.createToken = function(userId) {
    var payload = {
        sub: userId,
        iat: moment().unix(),
        exp: moment().add(1, "days").unix(),
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
};

exports.ensureAdminUser = function(req, res, next) {
  
  userDao.getById(req.user)
    .then(function (user) {
      if (!user.isAdmin) {
        var error = new AccessDeniedError('Insufficient privileges.');
        return res.status(error.statusCode).json(error);    
      } else {
        next();
      }
    }) 
}

exports.ensureAuthenticated = function(req, res, next) {
  if(!req.headers.authorization) {
    var error = new AccessDeniedError('Authorization header not found.');
    return res
      .status(error.statusCode)
      .json(error);
  }
  
  var token = req.headers.authorization.split(" ")[1];
  var payload = jwt.decode(token, config.TOKEN_SECRET);
  
  if(payload.exp <= moment().unix()) {
     var error = new UnauthorizedAccessError("Expired token");
     return res
      .status(error.statusCode)
        .json(error);
  }
  
  req.user = payload.sub;
  next();
}