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
      relations: {
        belongsTo: [ 
          { Artist: { type: 'artist', field: 'ArtistId'}}, 
          { Genre: { type: 'genre', field: 'GenreId'}}
        ],
        hasMany: [{ songs: { type: 'song'}}]
      }
    },
    {
      type: 'artist',
      relations: { 
        hasMany: [
          { songs: { type: 'song'}},
          { albums: { type: 'album'}}
        ]
      }
    },
    {
      type: 'genre',
      relations: {
        hasMany: [
          { songs: { type: 'song'}},
          { albums: { type: 'album'}}
        ]
      }
    },
    {
        type: 'song',
        relations: {
            belongsTo: [ 
              { Artist: { type: 'artist', field: 'ArtistId'}}, 
              { Genre: { type: 'genre', field: 'GenreId'}},
              { Album: { type: 'album', field: 'AlbumId'}}
            ],
            hasMany: [
               { SongUserInfo: { type: 'songuserinfo'}}
            ]
        }
    },
    {
        type: 'songuserinfo',
        relations: {
          belongsTo: [  
            { Song: { type: 'song', field: 'SongId'}}
          ],
        }
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