//
// Genre DAO
//

var Promise = require("bluebird");
var musicDB = require('../db/musicDB');

const GenericDao = require('./genericDao');

module.exports = class GenreDao extends GenericDao {

  constructor(){
    super(musicDB.db, musicDB.schema, 'genre') 
  }

  getOrCreateGenreByName(genre){
    return new Promise( (resolve, reject) => {
      this.getByName(genre)
      .then( (results) => {
         if (results.length == 0 ){
           return this.create({ name: genre })
                  .then(resolve).catch(reject);
         } else {
           resolve(results[0]); 
         }
      })
      .catch(reject);
    });
  }

}
