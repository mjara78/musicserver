var util = require('util');

var EventEmitter = require('events').EventEmitter;

// Constructor
function Scanner() {
}

util.inherits(Scanner, EventEmitter);

// Class Method
Scanner.prototype.scan = function (baseDir, callback) {
    
    var fileTypes = [ '.mp3'];

    var fs = require('fs');
    var numElements;
    var me = this;
    
    // Read file or directory
    var readElement = function (filePath, ext, stats) {
        
        if (stats.isFile()) {
        
            //console.log("Extension " + ext);
        
            if ( fileTypes.some(function (value) { // is accepted extension ?
                        return ext.indexOf(value) > -1; 
                })) {
                // only call callback when ext is acepted
                callback(filePath, stats);        
            }
            
            numElements--;
            
            if (numElements == 0){
                //console.log("Last file readed, ending event.");
                me.emit('end');
            }
            
        } else if (stats.isDirectory()) {
            
            var sc = new Scanner();
            sc.scan(filePath,callback);
            
            sc.on('end', function() {
                numElements--;
                if (numElements == 0){
                    //console.log("Last Directory readed, ending event.");
                    me.emit('end');
                }
            });
            
        }
    }
    
    // Process each element
    var processElement = function (name) {
        var path = require('path');
        
        var filePath = path.join(baseDir, name);
        var ext = path.extname(filePath);
        
        fs.stat(filePath, function (err, stats){
            if (err) {
                console.error("Error reading file: "+filePath);
                throw new Error(err);
            }
            
            readElement(filePath,ext,stats);    
        } ); 
        
        
    }
    
    // Process Directories
    var processDirs = function (err, files) {
        
        if (err) {
            console.error("Error reading directory: " + baseDir);
            throw new Error(err);
        }
        
        numElements = files.length;
        
        files.forEach(processElement);
    };
    
    // Read Directories and process
    fs.readdir(baseDir, processDirs);
    
};


// export the class
module.exports = Scanner;