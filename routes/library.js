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

  var extract = scanner.extractMetadata('/home/osmc/Music', function (filePath, tags){
      return new Promise (function  (resolve, reject){
        elements ++;
        
        //console.log('Filename:' + filePath + ' => Genre:' + tags.genre);
        resolve(elements);
      });
  });
  
  extract.then( function (elements){
    console.log("Files readed: " + elements);
    console.timeEnd("Library Update ends");
  });      
      
  res.send('library readed');
});

module.exports = router;