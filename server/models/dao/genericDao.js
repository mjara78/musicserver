const Promise = require("bluebird");
const uuid = require("uuid/v4");

const NotFoundError = require("../../controllers/errors/genericErrors").NotFoundError;
const ConfilctError = require("../../controllers/errors/genericErrors").ConflictError;
const shuffle = require('knuth-shuffle').knuthShuffle;

module.exports = class GenericDao {
  constructor(db, schema, type){
    this.db = db
    this.type = type
    this.schema = schema
  }

  async update(doc) {
	   try{ 
        doc.updatedAt = new Date();
       
        const result = await this.db.put(doc);
        doc._rev = result.rev;
 // console.log("update doc " + JSON.stringify(doc)) 
        return doc;
                  
     } catch (error) {
       if (error.code === 409) { // conflict
          throw new ConflictError(error.message);
  	    } else {
          throw new Error(error); // some other error
       }
     }
  }

  async create(doc) {
    try{
        doc.createdAt = new Date();
        doc.updatedAt = null;
        doc.type = this.type;
        
        if(doc.id == undefined || doc.id == null){
          doc.id = uuid()
        }         
        doc._id = this.type + '_' + doc.id;   

        const result = await this.db.put(doc);
        doc._rev = result.rev;
        
        return doc;
        
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllFilter(options) {   
    try{  
      if(options.customSelect) {
        options.selector = options.customSelect
      } else {   
          // Set doc type
          if(options.selector){
            options.selector.type = this.type;
          } else {
            options.selector = { _id: { $gt: this.type, $lt: this.type+"\uffff" }};
          } 
          // filter results
          if(options.filter){
            options.selector[Object.keys(options.filter)[0]] = Object.values(options.filter)[0]
          }  
      }            
         // Only for debug query
         if(options.debug){
           console.time('#### DEBUG => Query time')
           this.debugQuery(options);
         }

         const data = await this.db.find(options);
         
         if(options.debug) {
           console.log('#### DEBUG => Records found: '+data.docs.length)
           console.timeEnd('#### DEBUG => Query time')
         }
         
         let docs = data.docs;

         // Ordered results
         if(options.order){
           if (options.order === 'random') {
             shuffle(docs);
           } else {
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
          }

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
          // Load docs with relations included
          return await this.parseRelDocs(docs, options.include);
          
    } catch (error) {
      console.error('Error findAll: ' + JSON.stringify(error))
      throw new Error(error);
    }
  }

  async getById(id, options) {
    try{    
        let include;

        if(options){
          include = options.include;
       }
//console.log("getById: "+ this.type + ", id "+ id)
        const result = await this.db.get(this.type + '_' + id);
        let docs = [result];
//    console.log("getById result: "+ JSON.stringify(docs))    
        // Load relations  
        const res = await this.parseRelDocs(docs, include);
// console.log("getById rels result: "+ JSON.stringify(res))    
        return res[0]; 
 
    } catch (error) {
      if(error.status == 404){
        console.error('Error 404 getById ' + this.type + ' : ' + id)
        throw new NotFoundError();
      } else {
        throw new Error(error);
      }
    }
  }

  async getCountFilter(options) {   
    try {
      const results = await this.getAllFilter(options);
      return results.length;
    } catch( error) {
      throw Error(error);
    }
  }

  getByName(name){
    let options = {}
    options.filter = {
          'name': name
    }; 
    return this.getAllFilter(options)
  }

  async parseRelDocs(docs, include){
   try {
     let doctype = this.getDoctype();

     if( doctype.relations && doctype.relations.length > 0 && include ){

       // Iterate docs
       let docsPromises = docs.map( async (doc) => {
          // Iterate relations
          let relsPromises = doctype.relations.map( async (rel) => {
            let relName = Object.keys(rel)[0]; 
           
            if(this.isIncluded(include, relName)){
              let result;
               
  //  console.log('=> doc: '+JSON.stringify(doc))
              if(rel[relName].relType === 'belongsTo'){
                result = await this.getBelongsTo(rel[relName].type, doc[rel[relName].field]);
              } else { // hasMany
                result = await this.getHasMany(rel[relName].type, doc.id, included.filter);
              }
              return doc[relName] = result;
            } else { // rel not included
              return; // nothing to add 
            }
          });
          
          // Return doc when all relations are loaded
          await Promise.all(relsPromises);  
          return doc;          
       });  
       
       // Return docs array when all docs finished load relations
       return Promise.all(docsPromises);  
    } else {
      return Promise.resolve(docs);
    }
   } catch ( error) {
     console.error('Error parseRel: ' + error.message)
     throw new Error(error);
   }
    
  }

  getBelongsTo(type, id){
       let belongsToDao = new GenericDao(this.db, this.schema, type);
// console.log("belongsToDao "+ type + ", id "+ id)
       
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
  
  async debugQuery(options) {
    try{
      const explained = await this.db.explain(options);    
      console.log('#### DEBUG => Explain: ' + JSON.stringify(explained))
      console.log("#### DEBUG => Query: " + JSON.stringify(options))    
      return;
    } catch (error){
      throw new Error(error);
    }
  }
}