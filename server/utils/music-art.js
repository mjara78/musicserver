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

module.exports = class MusicArt {
  constructor(){
    this.albumArt = albumArt;
  }
  
  download(uri, filename) {
    return new Promise ( function (resolve, reject){
    
     var writeStream = fs.createWriteStream(filename);
         
     request(uri).pipe(writeStream)
       .on('close', resolve)
       .on('error', reject);
    });
  }
  
  musicArt(artistName, albumName, size){
    return new Promise ( (resolve, reject) => {
    var image = {};
    var folder;
    
    if (albumName) {
      folder = albumFolder;
    } else {
      folder = artistFolder;
    }
    
    this.albumArt(artistName, albumName, size)
      .then( (urlImage) => {
      
        if (urlImage) { // URL Not Empty

          // Get filename from URL
          var ext = path.extname(url.parse(urlImage).pathname);
          var filename = path.basename(url.parse(urlImage).pathname, ext);
              
          // Download image
         return this.download(urlImage, saveBasedir + folder + filename + '.' + size + ext )
          .then( () => {
            image["imageUrl" + size.capitalize()] = folder + filename + '.' + size + ext;
            return resolve(image);
          })        
        }
        else{ // URL Empty
          image["imageUrl" + size.capitalize()] = null;
          return resolve(image);
        }
       
      })
      .catch(function (){
        image["imageUrl" + size.capitalize()] = null;
        return resolve(image);
      });
    });
  }
  
  getImages(artistName, albumName) {
    var artistSizes = ['large', 'extralarge'];
    var albumSizes = ['small', 'large', 'extralarge'];

    var sizes;
    
    if(albumName){
      sizes = albumSizes;
    } else {
      sizes = artistSizes;
    }

    return Promise.map(sizes, (size) => {
      return this.musicArt(artistName, albumName, size);
    })
    .reduce( (imageObj,image) => {
				  
				 		var imageUrl = Object.keys(image)[0];
				 		imageObj[imageUrl] = image[imageUrl];
				 		
				 		return imageObj;
				 });
  }
  
  copyLocalImage(dir, name, album) {
    return new Promise ( (resolve, reject) => {
      const dest = 'server/public/assets/thumbnails/albums/'
      return fs.copyFile(dir+'/'+name, dest + album + '_' + name, (err) => {
        if (err) {
          console.error("Error finding local image " + dir+'/'+name + ".");
          return reject(err);
        } else {
          return resolve(albumFolder + album +'_'+ name);          
        }
      });
    })
  }
  
  searchLocalImage(dir, albumName) {
    const names = ['folder.jpg','cover.jpg','Folder.jpg','Cover.jpg','front.jpg','Front.jpg']
   
    let filesPromises = names.map( async (value) => {
      return this.copyLocalImage(dir, value, albumName);
    })
    
    return Promise.any(filesPromises)
    .catch( (error) => {
      console.log('Any local image found from :' + dir, error);
      throw new Error(error);
    });
  } 
}

