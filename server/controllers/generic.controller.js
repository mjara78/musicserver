var ServerError = require("./errors/genericErrors").ServerError;
var NotFoundError = require("./errors/genericErrors").NotFoundError;
var ConflictError = require("./errors/genericErrors").ConflictError;

module.exports = class GenericController {
  constructor(dao){ 
    this.dao = dao;  
  }

  parseParams(req, options){
    if (!options)  {
      options = {};
    }
   // console.log(" ** http Get params: " + JSON.stringify(req.query))
    
    if (req.query.order){
      options.order = req.query.order;
      if(req.query.orderType){
        options.orderType = req.query.orderType
      }
    }

    if (req.query.limit){
       options.paging = {}
       options.paging.limit = req.query.limit;
    }
    if (req.query.offset){
       if(!options.paging){
         options.paging = {}
       }
       options.paging.offset = req.query.offset;
    }
  
    if(req.query.regexp){
      options.filter.regexp = req.query.regexp;
    }
    if (req.query.isAdmin) {
      if(!options.filter){
        options.filter = {}
      }
      if (req.query.isAdmin == 'true'){
        options.filter.isAdmin = true
      } else {
        options.filter.isAdmin = false
      }
    }
    if ( options.filter && options.filter.regexp ){
      let key = Object.keys(options.filter)[0];
      options.filter[key] = { $regex: RegExp(options.filter[key], "i") }; 
    }
    if( req.query.debug ){
      options.debug = true
    }


    return options;
  }

  //  GET - Return one type by id
  getById(req, res) {
	   this.dao.getById(req.params.id)
    .then(function (result) {
      res.status(200).json(result);	
		  })
		  .catch(NotFoundError, function (error) {
			    res.status(error.statusCode).json(error);
		  })
	  	.catch(function (error) {
   			var errorObj = new ServerError(error.message);
			   res.status(errorObj.statusCode).json(errorObj);
		  });
  }

  // PUT - Update one reg already exists
  update(req, res) {
	   this.dao.update(req.body)
  		.then(function (result) {
    			res.status(200).json(result);
  		})
  		.catch(NotFoundError, function (error) {
		    	res.status(error.statusCode).json(error);
  		})
    .catch(ConflictError, function(error) {
      console.error('Error: ' + error.message);
      res.status(error.statusCode).json(error);
    })
  		.catch(function (error) {
    			var errorObj = new ServerError(error.message);
    			res.status(errorObj.statusCode).json(errorObj);
	   	});
  }

  create(req, res){
    this.dao.create(req.body)
        .then(function(result) {
            res.status(200).json(result.id);
        })
        .catch(function(error) {
            console.error(error)
            var errorObj = new ServerError(error.message);
            res.status(errorObj.statusCode).json(errorObj);
        });
  }

  delete(req, res){
    
    this.dao.delete(req.body.ids)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(error) {
            console.error(error)
            var errorObj = new ServerError(error.message);
            res.status(errorObj.statusCode).json(errorObj);
        });
  }

  getCountFilter(req, res) {
    this.dao.getCountFilter(this.parseParams(req))
     .then(function(count) {
        res.status(200).json(count);
     })
     .catch(function(error) {
        var errorObj = new ServerError(error.message);          
        res.status(errorObj.statusCode).json(errorObj);
     });
  }

  getAllFilter(req, res) {
    this.dao.getAllFilter(this.parseParams(req))
     .then(function(count) {
        res.status(200).json(count);
     })
     .catch(function(error) {
        var errorObj = new ServerError(error.message);          
        res.status(errorObj.statusCode).json(errorObj);
     });
  }
}