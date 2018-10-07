//
// User Controller
//
var randomstring = require("randomstring");
 
const UserDao = require("../models/dao/userDao");
var NotFoundError = require("./errors/genericErrors").NotFoundError;
var ServerError = require("./errors/genericErrors").ServerError;
var ConflictError = require("./errors/genericErrors").ConflictError;
const GenericController = require("./generic.controller");
var security = require("../utils/security");

module.exports = class UserController extends GenericController {
  constructor() {
    super(new UserDao())
  }

  loginUser(req, res){
    this.dao.getUserByNamePass(req.body.name, req.body.password)
        .then( (users) => {

            if(users.length == 0){
              throw new NotFoundError('Incorrect password or user not found.');
            }
            else {
               let user = users[0]

               var token = security.createToken(user.id);
        
               user.lastLogin = new Date();
             //   console.log(user);
               return this.dao.update(user).then(function(result){
                res.status(200).json({
                    token: token,
                    user: {
                        name: user.name,
                        isAdmin: user.isAdmin,
                        lastLogin: user.lastLogin
                    }
                });
              })
              .catch(ConflictError, function(error) {
                 console.error('Error: ' + error.message);
                 res.status(error.statusCode).json(error);
               })
              .catch(function(error) {
                var errorObj = new ServerError(error.message);
                console.error(error);
                res.status(errorObj.statusCode).json(errorObj);
              });  
            }          
        })
        .catch(NotFoundError, function(error) {
            res.status(error.statusCode).json(error);
        })
        .catch(function(error) {
            console.error(error)
            var errorObj = new ServerError(error.message);
            res.status(errorObj.statusCode).json(errorObj);
        });
  }

  createDefaultUser(req, res){

    var pass = randomstring.generate(8);
    
    console.log("Creating admin user with pass: " + pass);
    
    var user = {
      name: 'admin',
      password: pass,
      isAdmin: true
    };

    this.dao.create(user)
        .then(function(result) {
            res.status(200).json(result.id);
        })
        .catch(function(error) {
            console.error(error)
            var errorObj = new ServerError(error.message);
            res.status(errorObj.statusCode).json(errorObj);
        });
  }
}