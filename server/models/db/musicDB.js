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
          { Artist: { relType: 'belongsTo', type: 'artist', field: 'ArtistId'}}, 
          { Genre: { relType: 'belongsTo', type: 'genre', field: 'GenreId'}},
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
              { Artist: { relType: 'belongsTo', type: 'artist', field: 'ArtistId'}}, 
              { Genre: { relType: 'belongsTo', type: 'genre', field: 'GenreId'}},
              { Album: { relType: 'belongsTo', type: 'album', field: 'AlbumId'}},
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
db.createIndex({index: { fields: ['type'] }});

//db.crea'createdAt', 'type'fields: ['_id', 'createdAt'] }});

db.createIndex({index: { fields: ['type', 'name'] }});

db.createIndex({index: { fields: ['type', 'AlbumId'], name: 'song-album' }});

db.createIndex({index: { fields: ['type', 'filePath'] }});

db.createIndex({index: { fields: ['data.name'] }});


exports.db = db;

exports.PouchDB = PouchDB;