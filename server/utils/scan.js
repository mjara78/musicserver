var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));
var fsSync = require('fs');
var path = require('path');
var mmeta = require('music-metadata');
var songExists = require('../controllers/library.controller').songExists;
var musicArt = require("./music-art");
// const { COPYFILE_EXCL } = fs.constants;

var fileTypes = ['.mp3'];

function extractMetadata(baseDir, callback) {
     return new Promise (function (resolve, reject) {
       
    return fs.readdirAsync(baseDir)
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
          console.time("Processing time")
          var filePath = path.join(baseDir, element);
          var ext = path.extname(filePath);
  //   console.log("+file=>"+filePath)
          return fs.statAsync(filePath)
            .then( function (stats) {
                 if (stats.isFile()) {
                     if (admittedType(ext)) {
                        return songExists(filePath)
                          .then(function (exists) {
                            if (exists) {
                              console.log("===========>>>>>>>> Filepath already exists:"+filePath)
                              console.timeEnd("Processing time")
                              return resolve(0); // If song already exists dont process it
                            } else { // filepath not exists at any song
                              // Read metadata from file
                              return readMetadata(filePath)
                                .then(function (tags) {
                                    console.log("=====>>>> Processing file:"+filePath)
                                    console.timeEnd("Processing time")
                                    return callback (filePath, tags).then(resolve);
                                })
                                .catch(reject);
                            }
                          })
                     } else { // Filetype not admitted
                       return resolve(0);
                     }
                 } else { // is a directory
                    console.log("===========>>>>>>>> Scan new folder:" + filePath);
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

}

async function readMetadata (filePath) {
    try {
      let musicbrainz_albumartistid;
      let musicbrainz_artistid;
      
      const metadata = await mmeta.parseFile(filePath, { duration: true, skipCovers: true });
      
      // console.log(' Metadata: ' + JSON.stringify(metadata))

      // Genre
      var tagGenre;
      if (metadata.common.genre && metadata.common.genre.length > 0) {
         tagGenre = metadata.common.genre[0];	
      }
      else {
         tagGenre = 'unknow genre';
      }

      // Year
      var year = metadata.common.year;

      // Artist
      var artist;
      if (metadata.common.artists && metadata.common.artists.length > 0) {
        artist = metadata.common.artists[0];	
      }
      else {
        artist = 'unknow artist';
      }

      // Album Artist
      var albumArtist;
      if (metadata.common.albumartist) {
        albumArtist = metadata.common.albumartist;	
      }
      else {
        albumArtist = artist;
      }

      // Album
      if(metadata.common.album) {
        var album = metadata.common.album; 
      } else {
        var album = path.dirname(filePath).split(path.sep).pop();
      }

      // Title
      if (metadata.common.title) {
        var title = metadata.common.title;
      } else { 
        var title = path.basename(filePath, path.extname(filePath));
      }
      
      // Track
      if (metadata.common.track.no) {
        var track = metadata.common.track.no;
      } else {
        var track = 0; 
      }
      
      // Disk
      if (metadata.common.disk.no) {
        var disk = metadata.common.disk.no;
      } else {
        var disk = 0;
      }
      
      if(metadata.common.comment && metadata.common.comment.length > 0) {
        var comment = metadata.common.comment[0];
      } else {
        var comment = ''
      }
      
      var bitrate = metadata.format.bitrate;

      // Duration
      var duration = metadata.format.duration;
      
      // musicbrainz
      if(metadata.common.musicbrainz_artistid){
        musicbrainz_artistid = metadata.common.musicbrainz_artistid;
      } else {
        musicbrainz_artistid = '';
      } 
      
      if(metadata.common.musicbrainz_albumartistid){
        musicbrainz_albumartistid = metadata.common.musicbrainz_albumartistid;
      } else {
        musicbrainz_albumartistid = '';
      }
  
      var tags = {
            genre: tagGenre,
            year: year,
            artist: artist.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
            album: album,
            albumArtist: albumArtist.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
            title: title,
            track: track,
            duration: duration,
            disk: disk,
            comment: comment,
            bitrate: bitrate,
            musicbrainz_albumartistid: musicbrainz_albumartistid,
            musicbrainz_artistid: musicbrainz_artistid
          };
       
       
          return tags;
    } catch(error) {
      
      console.error('Error parsing file:', error);
      
      var tags = {
            genre: 'error genre',
            year: '0000',
            artist: 'error artist',
            album: 'error album',
            albumArtist: 'error artist',
            title: path.basename(filePath, path.extname(filePath)),
            track: '0',
            duration: '0'
          };
          
          throw new Error(error);
          //return tags;
    }
  }

exports.extractMetadata = extractMetadata;