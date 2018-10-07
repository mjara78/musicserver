var PouchDB = require('pouchdb-node').defaults({ prefix: __dirname + '/../../db/' });

//PouchDB.plugin(require('relational-pouch'));
PouchDB.plugin(require('pouchdb-find'));

var db = new PouchDB('users');

//db.destroy().then();

exports.schema = [
  {
    type: 'user',
  }];

// Indexes section
db.createIndex({
    index: {
      fields: ['type', 'name', 'password']
    }
  });

db.createIndex({
    index: {
      fields: ['type', 'isAdmin']
    }
  });

db.createIndex({
index: {
    fields: ['type', 'name']
}
});

exports.db = db;