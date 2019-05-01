//
// Album DAO
//

var MusicArt = require("../../utils/music-art");

var musicDB = require('../db/musicDB');

const GenericDao = require('./genericDao');

module.exports = class AlbumDao extends GenericDao {

  constructor(){
    super(musicDB.db, musicDB.schema, 'album');
    
    this.musicArt = new MusicArt(); 
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
    try{
      const results = await this.getAlbumByName(album.albumName);  
             
      if ( results.length == 0 ){
      
         let imageAlbum = await this.musicArt.getImages(album.artistName, album.albumName);
         
         let localImage = null;
         // Image album not found in internet
         if(!imageAlbum.imageUrlSmall) {
           try {
             localImage = await this.musicArt.searchLocalImage(album.path, album.albumName.replace(/(?!\.[^.]+$)\.|[^\w.]+/g, ''));
           } catch (error) {
             localImage = null;
           } 
           console.log('localImage:', localImage)
           imageAlbum.imageUrlSmall = localImage;
           imageAlbum.imageUrlLarge = localImage;
           imageAlbum.imageUrlExtralarge = localImage;
         }
         
         const resul = await this.create({ 
               albumName: album.albumName,
               year: album.year,
               albumGenreId: album.GenreId,
               albumArtistId: album.ArtistId,
               imageUrlSmall: imageAlbum.imageUrlSmall,
               imageUrlLarge: imageAlbum.imageUrlLarge,
               imageUrlExtralarge: imageAlbum.imageUrlExtralarge
         });
         return resul;
      } else {
         return results[0]; 
      }
    } catch(error){
      console.error('Error creating album:', error);
      throw Error(error);
    }
  }
}

