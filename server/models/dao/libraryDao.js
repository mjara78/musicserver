// Library DAO
var Promise = require("bluebird");
var musicDB = require('../db/musicDB');
const GenericDao = require('./genericDao');

module.exports = class LibraryDao extends GenericDao {

  constructor(){
    super(musicDB.db, musicDB.schema, 'library') 
  }

}
