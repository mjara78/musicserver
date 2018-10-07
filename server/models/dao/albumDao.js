//
// Album DAO
//

var Promise = require("bluebird");
var musicArt = require("../../utils/music-art");

var musicDB = require('../db/musicDB');

const GenericDao = require('./genericDao');

module.exports = class AlbumDao extends GenericDao {

  constructor(){
    super(musicDB.db, musicDB.schema, 'album') 
  }
 
  getOrCreateAlbumByName(album){
    return new Promise( (resolve, reject) => {
      this.getByName(album.name)
      .then( (results) => {
         if (results.length == 0 ){
           return musicArt.getImages(album.artistName, album.name) // Get images of artist
           .then( (images) => {
             return this.create({ 
               name: album.name,
               year: album.year,
               GenreId: album.GenreId,
               ArtistId: album.ArtistId,
               imageUrlSmall: images.imageUrlSmall,
               imageUrlLarge: images.imageUrlLarge,
               imageUrlExtralarge: images.imageUrlExtralarge 
             }).then(resolve).catch(reject);
           }).catch(reject);    
         } else {
           resolve(results[0]); 
         }
      })
      .catch(reject);
    });
  }

  getAlbums(options){ 
    options.include = [ { type: 'Artist' }] ;
    return this.getAllFilter(options)
  }
}

