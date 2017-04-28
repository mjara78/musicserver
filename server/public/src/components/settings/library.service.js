class LibraryService {  
  constructor (rest) {
    this.rest = rest;
  }

  getLibrary () {
    return this.rest.one('library')
    	.get()
    	.then(	response => response )
  }

  updateBasedir (basedir) {
    var library = this.rest.one('library');
    library.base_dir = basedir; 
    
    return library.put();
  }
  
  refreshLibrary () {
    return this.rest.one('library').post();
  }
}

LibraryService.$inject = ['Restangular']

export default LibraryService