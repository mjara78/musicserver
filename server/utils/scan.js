var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));
var fsSync = require('fs');
var path = require('path');
var mm = require('musicmetadata');
var mmeta = require('music-metadata');
var songExists = require('../controllers/library.controller').songExists;

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
                          //    console.log("===========>>>>>>>> Filepath already exists:"+filePath)
                              return resolve(0); // If song already exists dont process it
                            } else { // filepath not exists at any song
                              // Read metadata from file
                              return readMetadata(filePath)
                                .then(function (tags) {
                                //    console.log("=====>>>> Processing file:"+filePath)
                                    return callback (filePath, tags).then(resolve);
                                })
                                .catch(reject);
                            }
                          })
                     } else { // Filetype not admitted
                       return resolve(0);
                     }
                 } else { // is a directory
           //         console.log("===========>>>>>>>> Scan new folder:" + filePath);
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

exports.extractMetadata = extractMetadata;