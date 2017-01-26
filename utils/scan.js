var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));
var fsSync = require('fs');
var path = require('path');
var mm = require('musicmetadata');

var fileTypes = ['.mp3'];

function extractMetadata(baseDir, callback) {
     return new Promise (function (resolve, reject) {
       
        fs.readdirAsync(baseDir)
          .map(processElement)
          .all (resolve)
          .catch(reject);
       
       });
  
  function processElement (element) {
        
        var filePath = path.join(baseDir, element);
        var ext = path.extname(filePath);
        
        fs.statAsync(filePath)
        .then( function (stats) {
             if (stats.isFile) {
                 if (admittedType(ext)) {
                    readMetadata(filePath)
                      .then(function (tags) {
                          return callback (filePath, tags);
                      })
                      .catch(function (error) {
                         throw new Error(error);
                      });
                 }
             } else { // is a directory
                return extractMetadata(filePath, callback);
             }
          })
        .catch(function (error) {
             throw new Error(error);
          });
  }
  
  function admittedType (ext) {
     if ( fileTypes.some(function (value) { // is accepted extension ?
                    return ext.indexOf(value) > -1; 
            })) {
        return true;
     } else {
        return false;
     }   
  }
  
  function readMetadata (filePath) {
    return new Promise (function (resolve, reject) {
      
      var tagGenre;
      
      var readableStream = fsSync.createReadStream(filePath);
      var parser = mm(readableStream, function (err, metadata) {
        
        if (err) throw err;
       
        if (metadata.genre.length > 0) {
          tagGenre = metadata.genre[0];	
        }
        else {
          tagGenre = 'no genre';
        }
        
        readableStream.close();
        
        var tags = {
          genre: tagGenre.toLowerCase()
        };
        
      });
    });
  }
}

module.exports.extractMetadata = extractMetadata;