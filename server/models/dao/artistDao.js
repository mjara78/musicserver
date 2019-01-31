//
// Artist DAO
//

var musicArt = require("../../utils/music-art");
var musicDB = require('../db/musicDB');

const GenericDao = require('./genericDao');

module.exports = class ArtistDao extends GenericDao {

  constructor(){
    super(musicDB.db, musicDB.schema, 'artist') 
  }
  
  getArtistByName(artist) {
    let options = { }
    options.customSelect = {
      'artistName': artist
    }; 
    return this.getAllFilter(options)
  }
  
  async getOrCreateArtistByName(artistName){
    try {
      const results = await this.getArtistByName(artistName);         
      if ( results.length == 0 ){
         const images = await musicArt.getImages(artistName, null); // Get images of artist
         const resul = await this.create({ 
               artistName: artistName,
               imageUrlSmall: images.imageUrlSmall,
               imageUrlLarge: images.imageUrlLarge,
               imageUrlExtralarge: images.imageUrlExtralarge
         });
         return result;
      } else {
         return results[0]; 
      }
    } 
  }
}

