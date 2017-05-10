class RecentsService {  
  constructor (rest) {
    this.rest = rest;
  }

  getRecents () {
    return this.rest.all('albums')
    	.getList({ limit:'10', order: 'Album.createdAt DESC'})
    	.then(	response => response )
  }
}

RecentsService.$inject = ['Restangular']

export default RecentsService