//
// User DAO
//

var Promise = require("bluebird");
var usersDB = require('../db/usersDB');
const GenericDao = require('./genericDao');

module.exports = class UserDao extends GenericDao {

  constructor(){
    super(usersDB.db, usersDB.db, 'user') 
  }

  getUserByNamePass(name, password){
    let options = {
       selector: { 
                'name': name,
                'password': password
       }
    }; 
    return this.getAllFilter(options)
  }

} 
