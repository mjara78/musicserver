var PouchDB = require('pouchdb-node').defaults({ prefix: __dirname + '/../../db/' });

//PouchDB.plugin(require('relational-pouch'));
PouchDB.plugin(require('pouchdb-find'));


var db = new PouchDB('musicserver');

//db.destroy().then();

exports.schema = [
    {
      type: 'library'
    },
    {
      type: 'album',
      relations: [ 
          { Artist: { relType: 'belongsTo', type: 'artist', field: 'albumArtistId'}}, 
          { Genre: { relType: 'belongsTo', type: 'genre', field: 'albumGenreId'}},
          { songs: { relType: 'hasMany', type: 'song'}}
      ]    
    },
    {
      type: 'artist',
      relations: [
          { songs: { relType: 'hasMany', type: 'song'}},
          { albums: { relType: 'hasMany', type: 'album'}}
        ]
    },
    {
      type: 'genre',
      relations: [
          { songs: { relType: 'hasMany', type: 'song'}},
          { albums: { relType: 'hasMany', type: 'album'}}
      ]
    },
    {
        type: 'song',
        relations: [ 
              { Artist: { relType: 'belongsTo', type: 'artist', field: 'songArtistId'}}, 
              { Genre: { relType: 'belongsTo', type: 'genre', field: 'songGenreId'}},
              { Album: { relType: 'belongsTo', type: 'album', field: 'songAlbumId'}},
              { SongUserInfo: { relType: 'hasMany', type: 'songuserinfo'}}
        ]
    },
    {
        type: 'songuserinfo',
        relations: [  
            { Song: { relType: 'belongsTo', type: 'song', field: 'SongId'}}
        ]
    }
  ];

// Indexes section
//db.createIndex({index: { fields: ['type'] }});

// db.createIndex({index: { fields: ['type', 'name'] }});

// db.createIndex({index: { fields: ['type', 'AlbumId'], name: 'song-album' }});

db.createIndex({index: { fields: ['filePath'], name: 'filePath' }});
db.createIndex({index: { fields: ['genreName'], name: 'genrename' }});
db.createIndex({index: { fields: ['artistName'], name: 'artistname' }});
db.createIndex({index: { fields: ['albumName'], name: 'albumname' }});
db.createIndex({index: { fields: ['albumArtistId'], name: 'albumartistid' }});
db.createIndex({index: { fields: ['albumGenreId'], name: 'albumgenreid' }});
db.createIndex({index: { fields: ['songAlbumId'], name: 'songalbumid' }});
db.createIndex({index: { fields: ['songArtistId'], name: 'songartistid' }});
db.createIndex({index: { fields: ['songGenreId'], name: 'songgenreid' }});

// db.createIndex({index: { fields: ['data.name'] }});


/*db.deleteIndex({ ddoc: '_design/idx-3cdf111b18befad2d6f058b0f9a8f197',
       name: 'filePath',
       type: 'json',
       def: { fields: [ { _id: 'asc' }, { filePath: 'asc' } ]} }).then( (res) => {
         console.log("ok");
       })*/

/*db.getIndexes().then(function (result) {
  console.log(result)
}).catch(function (err) {
  // ouch, an error
});*/

exports.db = db;

exports.PouchDB = PouchDB;