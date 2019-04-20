//
// SongUserInfo DAO
//

var Promise = require("bluebird");
var musicDB = require('../db/musicDB');

const GenericDao = require('./genericDao');

module.exports = class SongUserInfoDao extends GenericDao {

  constructor(){
    super(musicDB.db, musicDB.schema, 'songuserinfo') 
  }
  
  updateSongInfoByUser(idSong, idUser, info){
    const doc = {
      id: idSong + '_' + idUser,
      type: this.type,
      songuserinfoSongId: idSong,
      songuserinfoUserId: idUser,
      like: info.like,
      playcount: info.playcount
    };
    
    return this.upsert(doc);  
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


