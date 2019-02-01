//
// Genre DAO
//

var musicDB = require('../db/musicDB');

const GenericDao = require('./genericDao');

module.exports = class GenreDao extends GenericDao {

  constructor(){
    super(musicDB.db, musicDB.schema, 'genre') 
  }

  async getOrCreateGenreByName(genre){
      const results = await this.getGenreByName(genre);         
      if ( results.length == 0 ){
         const resul = await this.create({ genreName: genre });
         return resul;
      } else {
         return results[0]; 
      } 
  }
  
  getGenreByName(genre) {
    let options = { }
    options.customSelect = {
      'genreName': genre
    }; 
    return this.getAllFilter(options)
  }

}
