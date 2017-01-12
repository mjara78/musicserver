var express = require('express');
var router = express.Router();
//var id3 = require("id3js");

/* GET library. */
router.get('/', function(req, res, next) {
  
  
  
  var Scanner = require("../utils/scanner");
  
  var scanner = new Scanner();
  
  console.log("Update library...");
  console.time("Library Update ends");

  var elements = 0;  

  scanner.scan('/home/osmc/Music', function (filePath, stat){
      
      elements++;
      //console.log(filePath);
      
      //id3({ file: filePath, type: id3.OPEN_LOCAL }, function(err, tags) {
      //    console.log('===>Track' + tags.track);
      //    console.log('===>Title' + tags.title);
      //    console.log('===>Album' + tags.album);
      //    console.log('===>Artist' + tags.artist);
      //});
  });
  
  scanner.on('end', function (){
    console.log("Files readed: " + elements);
    console.timeEnd("Library Update ends");
  });
  
  
  res.send('library readed');
});

module.exports = router;