class GenericResourceService {  
  constructor (Restangular) { "ngInject";
    this.Restangular  = Restangular

    this.resource = null
  }

  getAll(options){
    return this.Restangular.all(this.resource)
      .getList(options)
      .then(  response => response )
  }

  getOne(id){
    return this.Restangular.one(this.resource, id)
      .get()
      .then(  response => response ) 
  }

  getCountAll(options){
    return this.Restangular.one(this.resource)
            .customGET("count", this.options)
            .then(response => response)
  }

  post(content){
    return this.Restangular.all(this.resource).post(content);
  }

  put(content, id, path){
    return this.Restangular.one(this.resource, id)
            .customPUT(content, path)
            .then(response => response)
  }
  
}

export default GenericResourceService