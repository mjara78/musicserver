const Promise = require("bluebird");
const uuid = require("uuid/v4");

const NotFoundError = require("../../controllers/errors/genericErrors").NotFoundError;
const ConfilctError = require("../../controllers/errors/genericErrors").ConflictError;

module.exports = class GenericDao {
  constructor(db, schema, type){
    this.db = db
    this.type = type
    this.schema = schema
  }

  update(doc) {
	   return new Promise( (resolve, reject) => { 
        doc.updatedAt = new Date();
       
        this.db.put(doc)
            .then( (result) => {
                doc._rev = result.rev;
                resolve(doc);
            })
            .catch(function (err) {
                if (err.code === 409) { // conflict
                  throw new ConflictError(err.message);
  	             } else {
                  reject(err) // some other error
                }
            });    
     });
  }

  create(doc) {
    return new Promise( (resolve, reject) => {
        doc.createdAt = new Date();
        doc.updatedAt = null;
        doc.type = this.type;
        
        if(doc.id == undefined || doc.id == null){
          doc.id = uuid()
        }         
        doc._id = this.type + '_' + doc.id;   

        this.db.put(doc).then( (result) => {
          doc._rev = result.rev;
          resolve(doc)
        }).catch(reject);
    });
  }

  getAllFilter(options) {   
    return new Promise( (resolve, reject) => {
        
          // Set doc type
          if(options.selector){
            options.selector.type = this.type;
          } else {
            options.selector = { _id: { $gt: this.type, $lt: this.type+"\uffff" }};
    /*        if(options.order){
              options.sort = [{}]
              options.sort[0] = '_id';
            } */
          } 
          // filter results
          if(options.filter){
            options.selector[Object.keys(options.filter)[0]] = Object.values(options.filter)[0]
          }
          
           // order results
   /*       if(options.order){
            if(!options.selector){
              options.selector = {}
            }
            options.selector[options.order] = {$gt: true}; 

            if(options.orderType){
              options.sort[1] = {}
              options.sort[1][options.order] = options.orderType 
            } else {
              options.sort[1] = options.order
            }
          }*/
                   
         // console.log(options)
if(options.debug){
  this.db.explain(options)
  .then((explained)=>{
     console.log(explained)
     console.log(explained.index.def.fields)
   })
}
/*this.db.explain(options)
.then((explained)=>{
console.log(explained)
console.log(explained.index.def.fields)
})*/
          this.db.find(options)
          .then( (data) => {
        //      console.log('Filtered query.')
        //      console.log(options);
            let docs = data.docs
            // Paging results
            if(options.paging){
              if(!options.paging.limit){
                options.paging.limit = docs.length
              }
              if(!options.paging.offset){
                options.paging.offset = 0
              }

              docs = docs.slice(options.paging.offset, options.paging.limit)
            }

            // Ordered results
            if(options.order){
              docs.sort( (minor, higher) => {
                if(options.orderType === 'desc'){
                  if( typeof higher[options.order] === 'string'){
                    return higher[options.order].localeCompare(minor[options.order]);
                  } else {
                    return higher[options.order] - minor[options.order];
                  }
                } else {
                  if( typeof higher[options.order] === 'string'){
                    return minor[options.order].localeCompare(higher[options.order]);
                  } else {
                    return minor[options.order] - higher[options.order];
                  }
                }
              });
            }

              this.parseRelDocs(docs, options.include)
              .then( (results) => {
               //  console.log(results)
                 resolve(results)
              })
              .catch(reject);
          })
          .catch(reject);
      /*  } 
        else { // search without filter
          this.db.rel.find(this.type, options)
          .then( (result) => {
             console.log('Search '+ this.type + ' without filter.')
             console.log(result)
             resolve(result[this.typePlu])
          })
          .catch(reject);
        }*/
        
    });
  }

  getById(id, options) {
    return new Promise( (resolve, reject) => {
        let include;

        if(options){
          include = options.include;
        }

        this.db.get(this.type + '_' + id)
        .then( (result) => {
          //  console.log(result)
     
            let docs = [result];
            this.parseRelDocs(docs, include)
            .then( (res) => {
          //     console.log(res	)
               resolve(res[0]); 
            })
            .catch(reject);  
        })
        .catch( (error) => {
          if(error.status == 404){
            reject(new NotFoundError());
          } else {
            reject(error)
          }
        });
    });
  }

  getCountFilter(options) {
    return new Promise( (resolve, reject) => {
      this.getAllFilter(options)
      .then( (results) => {
   //      console.log(results)
         resolve(results.length);
      }).catch(reject);
    });
  }

  getByName(name){
    let options = {}
    options.filter = {
          'name': name
    }; 
    return this.getAllFilter(options)
  }

  parseRelDocs(docs, include){
    let doctype = this.getDoctype();

    if( (doctype.relations && doctype.relations.hasMany && include) ||
        (doctype.relations && doctype.relations.belongsTo && include) ){

       // Iterate docs
       return Promise.map(docs, (doc) => {
//console.log("doc")
//console.log(doc)
         // Iterate belongsTo relations...
         let relations = {};
         let belongsToPromise = Promise.map(doctype.relations.belongsTo, (rel) => {
           let keys = Object.keys(rel);

           if(this.isIncluded(include, keys[0])){
//console.log(keys[0])
             // load belongs object
             return this.getBelongsTo(rel[keys[0]].type, doc[rel[keys[0]].field])
             .then( (result) => {
                // add to relations
                // relations[keys[0]] = result;
                return doc[keys[0]] = result;
             });
           } else {
             return; // nothing to add 
           } 
           
         });

        // Iterate hasMany relations...
        let hasManyPromise = Promise.map(doctype.relations.hasMany, (rel) => {
          let keys = Object.keys(rel);
          let included = this.isIncluded(include, keys[0]);
          if(included){
//console.log(keys[0])
            // load hasMany List
            return this.getHasMany(rel[keys[0]].type, doc.id, included.filter)
            .then( (results) => {
                // add to relations
                // relations[keys[0]] = results;
                return doc[keys[0]] = result;
            });
          } else {
            return; // nothing to add 
          } 
          
        });

         // 
     /*    return Promise.join(belongsToPromise, hasManyPromise, (belongsTo, hasMany) => {
            let keys = Object.keys(relations);
            //console.log(relations)
           // console.log(keys)
          //  console.log(Object.values(relations) )
       //  console.log(doc)
            return Object.values(relations).reduce((docBefore, current, index) => {
               docBefore[keys[index]] = current;
   //    console.log(docBefore)
               return docBefore;
            }, doc);
         }); */
         
         return Promise.join(belongsToPromise, hasManyPromise, (belongsTo, hasMany) => {
            return doc;
         });
       });
    
    } else {
      return Promise.resolve(docs);
    }
  }

  getBelongsTo(type, id){
       let belongsToDao = new GenericDao(this.db, this.schema, type);
//console.log("belongsToDao "+ type + ", id "+ id)
       
       return belongsToDao.getById(id);
  }

  getHasMany(type, ){
    let hasManyDao = new GenericDao(this.db, this.schema, type);
//console.log("hasManyDao "+ type + ", id "+ id)
       if(filter){
         let options = { filter: filter }
       }
       return hasManyDao.getAllFilter(options);
  }
  
  getDoctype(){
    return this.schema.find( (elem) => {
      return elem.type === this.type;
    }); 
  }

  isIncluded(include, type) {
     return include.find(function (value) { // is type included
              return type === value.type; 
            });
  }
}