var Promise = require("bluebird");
var albumArt = require('album-art');
var fs = require("fs");
var request = require('request');
var url = require('url');
var path = require('path');
const axios = require('axios');

var saveBasedir = 'server/public/';
var artistFolder = 'assets/thumbnails/artists/';
var albumFolder = 'assets/thumbnails/albums/';
var genericImage = 'assets/svg/logo.svg';

const lastFmApiKey = '985dbd5db901948856e11fab8e0ff76b';
const fanartTVApikey ='764e83e681cfc58453a86f171de5d23d';

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
  
  musicArt(artistName, albumName, sizeArt){
    return new Promise ( async (resolve, reject) => {
    var image = {};
    var folder;
    let urlImage;
    
    try{
      if (albumName) {
        folder = albumFolder;
        urlImage = await this.albumArt(artistName, { album: albumName, size: sizeArt});
      } else {
        folder = artistFolder;
        urlImage = await this.getArtistImage(artistName, sizeArt);
      }
      
      if (urlImage) { // URL Not Empty

        // Get filename from URL
        var ext = path.extname(url.parse(urlImage).pathname);
        var filename = path.basename(url.parse(urlImage).pathname, ext);
              
        // Download image
        return this.download(urlImage, saveBasedir + folder + filename + '.' + sizeArt + ext )
        .then( () => {
          image["imageUrl" + sizeArt.capitalize()] = folder + filename + '.' + sizeArt + ext;
          return resolve(image);
        })        
      }
      else{ // URL Empty
        image["imageUrl" + sizeArt.capitalize()] = null;
        return resolve(image);
      }
    } catch(error){
      console.error('Error searching music art for ' + artistName + ' and ' + albumName, error);
      image["imageUrl" + sizeArt.capitalize()] = null;
      return resolve(image);
    }
    
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
      console.log('Any local image found from :' + dir);
      throw new Error(error);
    });
  }
  
  async getArtistfanArtTV(musicBrainzID, size){
      try{
       
        const response = await axios.get('https://webservice.fanart.tv/v3/music/'+musicBrainzID+'&?api_key=' + fanartTVApikey + '&format=json');
        
        let fanartImage = response.data.artistthumb[0].url;
         
        if(size ==='large') {
          fanartImage = fanartImage.replace('https://assets.fanart.tv/fanart/','https://assets.fanart.tv/preview/'); 
        }
           
        return fanartImage;          
        
      } catch(error) {
        console.error('Error finding fanart tv:', error.message);
        return null;
      }
  }
  
  async getArtistMBrainzId(artist_name){
      try{
        const response = await axios.get('https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+artist_name+'&api_key=' + lastFmApiKey + '&format=json');
            
        if(response.data.artist.mbid !== ""){
          return response.data.artist.mbid; 
        } else {
          return null;
        }
                    
      } catch(error){
        console.error('Error finding music brainz id:', error.message);
        return null;
      }
  }
  
  async getArtistImage(artist_name, size){
    try{
      const mbId = await this.getArtistMBrainzId(artist_name);
      
      if(mbId){
        return this.getArtistfanArtTV(mbId, size);
      } else {
        return null;
      }
      
    } catch(error){
      throw Error(error);
    }
  }
}
