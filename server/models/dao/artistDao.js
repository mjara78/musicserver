//
// Artist DAO
//

var Promise = require("bluebird");
var musicArt = require("../../utils/music-art");
var musicDB = require('../db/musicDB');

const GenericDao = require('./genericDao');

module.exports = class ArtistDao extends GenericDao {

  constructor(){
    super(musicDB.db, musicDB.schema, 'artist') 
  }
 
  getOrCreateArtistByName(artistName){
    return new Promise( (resolve, reject) => {

      this.getByName(artistName)
      .then( (results) => {
         if (results.length == 0 ){
           return musicArt.getImages(artistName, null) // Get images of artist
           .then( (images) => {
             return this.create({ 
               name: artistName,
               imageUrlSmall: images.imageUrlSmall,
               imageUrlLarge: images.imageUrlLarge,
               imageUrlExtralarge: images.imageUrlExtralarge 
             }).then(resolve).catch(reject);
           }).catch(reject)    
         } else {
           resolve(results[0]); 
         }
      })
      .catch(reject);
    });
  }
}

