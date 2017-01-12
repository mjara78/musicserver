// Library DAO
var Promise = require("bluebird");
var models = require('../../models/index');
var Library = models.Library;

exports.getLibrary = function () {
    return new Promise(function (resolve, reject) {
        Library.findOrCreate({
	    	where: { id: 1 }, 
	    	defaults: { state: 'updated' }
	    }).then(function (result) {
	    	// result contains the library and one boolean indicanting if was create  
	    	resolve(result[0]); 
	    }).catch(reject);
    });
};

exports.updateLibrary = function (library) {
	return new Promise(function (resolve, reject) {
		
    	Library.update(
			{ base_dir: library.base_dir,
			  num_elements: library.num_elements,
			  state: library.state,
			  last_refresh: library.last_refresh },
			{  
			  where: { id: 1 }
			}
		)
		.then(resolve)
		.catch(reject);    
    });
};