//
// Artist DAO
//

var MusicArt = require("../../utils/music-art");
var musicDB = require('../db/musicDB');

const GenericDao = require('./genericDao');

module.exports = class ArtistDao extends GenericDao {

  constructor(){
    super(musicDB.db, musicDB.schema, 'artist');
    
    this.musicArt = new MusicArt();
  }
  
  getArtistByName(artist) {
    let options = { }
    options.customSelect = {
      'artistName': artist
    }; 
    return this.getAllFilter(options)
  }
  
  async getOrCreateArtistByName(artistName, images){
    try{
      const results = await this.getArtistByName(artistName);         
      if ( results.length == 0 ){
         const images = await this.musicArt.getImages(artistName, null);
         const resul = await this.create({ 
               artistName: artistName,
               imageUrlSmall: images.imageUrlSmall,
               imageUrlLarge: images.imageUrlLarge,
               imageUrlExtralarge: images.imageUrlExtralarge
         });
         return resul;
      } else {
         return results[0]; 
      }
    } catch(error) {
      console.error('Error at create artist:', error);
      throw Error(error);
    }
  }
}

