//
// Song DAO
//

var Promise = require("bluebird");
var musicDB = require('../db/musicDB');

const GenericDao = require('./genericDao');

module.exports = class SongDao extends GenericDao {

  constructor(){
    super(musicDB.db, musicDB.schema, 'song') 
  }
 
  getSongByFilePath(filePath) {
    let options = { }
    options.customSelect = {
      'filePath': filePath
    }; 
    return this.getAllFilter(options)
  }

  getSongById(id, include, idUser){
      let options = null;
    if(include){
        options.include = [ { type: 'Artist' },
                        { type: 'Album' },
                        { type: 'UserLikes', filter: { UserId: idUser } } 
                      ]
    }
    
    return this.getById(id, options);
  }

  getSongs(options, idUser){
    options.include = [ { type: 'Artist' },
                        { type: 'Album' },
                        { type: 'UserLikes', filter: { UserId: idUser } } 
                    ]

    return this.getAllFilter(options);
  }

  getSongsByAlbum(options, idUser, idAlbum){
    options.include = [ { type: 'Artist' },
                        { type: 'Album' },
                        { type: 'UserLikes', filter: { UserId: idUser } } 
                    ]
    
    options.customSelect = {
      'songAlbumId': idAlbum
    }; 

    return this.getAllFilter(options);
  }
}
/*

// Update info of a song by user
exports.updateSongInfoByUser = function updateSongInfoByUser (idSong, idUser, info) {
    return new Promise(function (resolve, reject) {
        SongUser.upsert({
            playCount: info.playCount,
            like: info.like,
            dislike: info.dislike,
            UserId: idUser,
            SongId: idSong
          }).then(resolve)
          .catch(reject);
    });
};
*/


