var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));
var fsSync = require('fs');
var path = require('path');
var mm = require('musicmetadata');
var songExists = require('../controllers/library.controller').songExists;

var fileTypes = ['.mp3'];

function extractMetadata(baseDir, callback) {
     return new Promise (function (resolve, reject) {
       
        fs.readdirAsync(baseDir)
          .map(processElement,{concurrency: 1 })
					.reduce(function (total, elem) {
							if ( elem > total){
									return elem;
							} else {
									return total;
							}
					})
					.then(resolve)
          .catch(reject);
       
       });
  
  function processElement (element) {
        return new Promise (function (resolve, reject) {
          
          var filePath = path.join(baseDir, element);
          var ext = path.extname(filePath);

          fs.statAsync(filePath)
            .then( function (stats) {
                 if (stats.isFile()) {
                     if (admittedType(ext)) {
                        songExists(filePath)
                          .then(function (exists) {
                            if (exists) {
                        //      console.log("===========>>>>>>>> Filepath already exists:"+filePath)
                              return resolve(0); // If song already exists dont process it
                            } else { // filepath not exists at any song
                              // Read metadata from file
                              readMetadata(filePath)
                                .then(function (tags) {
                          //          console.log("===========>>>>>>>> Processing file:"+filePath)
                                    return callback (filePath, tags).then(resolve);
                                })
                                .catch(reject);
                            }
                          })
                     } else { // Filetype not admitted
                       return resolve(0);
                     }
                 } else { // is a directory
                    return extractMetadata(filePath, callback).then(resolve);
                 }
              })
            .catch(reject);  
              
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
      var currentFile = filePath;
      
      var readableStream = fsSync.createReadStream(filePath);
      var parser = mm(readableStream, { duration: true }, function (err, metadata) {
        
        if (err) {
          console.log('Error reading metadata from ' + currentFile + '. ' + err);
          
          var tags = {
            genre: 'unknow genre',
            year: '0000',
            artist: 'unknow artist',
            album: 'unknow album',
            albumArtist: 'unknow artist',
            title: 'error reading',
            track: '0',
            duration: '0'
          };
        
        } 
        else {
          // Genre
          if (metadata.genre.length > 0) {
            tagGenre = metadata.genre[0];	
          }
          else {
            tagGenre = 'unknow genre';
          }
        
          // Year
          var year = metadata.year;
        
          // Artist
          var artist;
          if (metadata.artist.length > 0) {
            artist = metadata.artist[0];	
          }
          else {
            artist = 'unknow artist';
          }
        
          // Album Artist
          var albumArtist;
          if (metadata.albumartist.length > 0) {
            albumArtist = metadata.albumartist[0];	
          }
          else {
            albumArtist = artist;
          }
        
          // Album
          var album = metadata.album; 
        
          // Title
          var title = metadata.title;
        
          // Track
          var track = metadata.track.no;
        
          // Duration
          var duration = metadata.duration;
        
          readableStream.close();
        
          var tags = {
            genre: tagGenre,
            year: year,
            artist: artist,
            album: album,
            albumArtist: albumArtist,
            title: title,
            track: track,
            duration: duration
          };
        }    
        
        resolve(tags);
      });
    });
  }
}

exports.extractMetadata = extractMetadata;