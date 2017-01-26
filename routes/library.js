var express = require('express');
var Promise = require("bluebird");
var router = express.Router();
//var id3 = require("id3js");

/* GET library. */
router.get('/', function(req, res, next) {
  
  var scanner = require("../utils/scan");
  
  console.log("Update library...");
  console.time("Library Update ends");

  var elements = 0;  

  scanner.extractMetadata('/home/osmc/Music', function (filePath, tags){
      return Promise (function  (resolve, reject){
        elements ++;
        
        console.log('Filename:' + filePath + ' => Genre:' + tags.genre);
        resolve();
      })
  }).then( function (elements){
    console.log("Files readed: " + elements);
    console.timeEnd("Library Update ends");
  });      
      
  res.send('library readed');
});

module.exports = router;