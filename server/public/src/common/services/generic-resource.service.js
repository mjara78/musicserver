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

  getCount(filter) {
    var options = {}
    if (filter.name) {
      options.name = filter.name
    } else {
      options.name = null
    }

    return this.getCountAll(this.options);
  }
  
}

export default GenericResourceService