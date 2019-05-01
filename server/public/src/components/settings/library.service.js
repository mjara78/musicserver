class LibraryService {  
  constructor (Restangular) { "ngInject";
    this.Restangular = Restangular;
  }

  getLibrary () {
    return this.Restangular.one('library')
    	.get()
    	.then(	response => response )
  }

  updateBasedir (basedir) {
    return this.Restangular.one('library')
    .get()
    .then( (library) => {
       library.baseDir = basedir; 
       return library.put();
    });
  }
  
  refreshLibrary () {
    return this.Restangular.one('library').post();
  }
}

export default LibraryService