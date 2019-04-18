var Promise = require("bluebird");
var albumArt = Promise.promisify(require('album-art'));
var fs = require("fs");
var request = require('request');
var url = require('url');
var path = require('path');

var saveBasedir = 'server/public/';
var artistFolder = 'assets/thumbnails/artists/';
var albumFolder = 'assets/thumbnails/albums/';
var genericImage = 'assets/svg/logo.svg';

var download = function download (uri, filename) {
  return new Promise ( function (resolve, reject){
    
     var writeStream = fs.createWriteStream(filename);
         
     request(uri).pipe(writeStream)
       .on('close', resolve)
       .on('error', reject);
  });
};

var musicArt = function (artistName, albumName, size) { 
  return new Promise (function (resolve, reject) {
    var image = {};
    var folder;
    
    if (albumName) {
      folder = albumFolder;
    } else {
      folder = artistFolder;
    }
    
    albumArt(artistName, albumName, size)
      .then( function (urlImage) {
      
        if (urlImage) { // URL Not Empty

          // Get filename from URL
          var ext = path.extname(url.parse(urlImage).pathname);
          var filename = path.basename(url.parse(urlImage).pathname, ext);
              
          // Download image
         return download(urlImage, saveBasedir + folder + filename + '.' + size + ext )
          .then( function () {
            image["imageUrl" + size.capitalize()] = folder + filename + '.' + size + ext;
            resolve(image);
          })        
        }
        else{ // URL Empty
          image["imageUrl" + size.capitalize()] = null;
          resolve(image);
        }
       
      })
      .catch(function (){
        image["imageUrl" + size.capitalize()] = null;
        resolve(image);
      });
  });
};

exports.getImages = function getImages(artistName, albumName) {
  
    var artistSizes = ['large', 'extralarge'];
    var albumSizes = ['small', 'large', 'extralarge'];

    var sizes;
    
    if(albumName){
      sizes = albumSizes;
    } else {
      sizes = artistSizes;
    }

    return Promise.map(sizes, function(size){
      return musicArt(artistName, albumName, size);
    })
    .reduce( function (imageObj,image) {
				  
				 		var imageUrl = Object.keys(image)[0];
				 		imageObj[imageUrl] = image[imageUrl];
				 		
				 		return imageObj;
				 });
    
};

