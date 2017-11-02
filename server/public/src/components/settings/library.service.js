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
    var library = this.Restangular.one('library');
    library.base_dir = basedir; 
    
    return library.put();
  }
  
  refreshLibrary () {
    return this.Restangular.one('library').post();
  }
}

export default LibraryService