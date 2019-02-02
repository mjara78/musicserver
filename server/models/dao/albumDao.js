//
// Album DAO
//

var musicArt = require("../../utils/music-art");

var musicDB = require('../db/musicDB');

const GenericDao = require('./genericDao');

module.exports = class AlbumDao extends GenericDao {

  constructor(){
    super(musicDB.db, musicDB.schema, 'album') 
  }

  getAlbums(options){ 
    options.include = [ { type: 'Artist' }] ;
    return this.getAllFilter(options)
  }
  
  getAlbumByName( album ) {
    let options = { }
    options.customSelect = {
      'albumName': album
    }; 
    return this.getAllFilter(options)
  }
  
  async getOrCreateAlbumByName(album){
      const results = await this.getAlbumByName(album.albumName);         
      if ( results.length == 0 ){
         const images = await musicArt.getImages(album.artistName, album.albumName); // Get images of album
         const resul = await this.create({ 
               albumName: album.albumName,
               year: album.year,
               albumGenreId: album.GenreId,
               albumArtistId: album.ArtistId,
               imageUrlSmall: images.imageUrlSmall,
               imageUrlLarge: images.imageUrlLarge,
               imageUrlExtralarge: images.imageUrlExtralarge
         });
         return resul;
      } else {
         return results[0]; 
      }
  }
}

