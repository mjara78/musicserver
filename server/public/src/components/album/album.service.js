class AlbumService {  
  constructor (rest) {
    this.rest  = rest;
    this.options = {};
  }

  getRecents () {
    return this.rest.all('albums')
    	.getList({ limit:'12', order: 'Album.createdAt DESC'})
    	.then(	response => response )
  }

  getAlbumSongs (idAlbum) {
    return this.rest.one('albums', idAlbum).all('songs')
    	.getList({ order: 'track'})
    	.then(	response => response )
  }
  
  fetchPage(offset, limit, filter) {
        this.options.order = 'Album.name';
        this.options.offset = offset;
        this.options.limit = limit;

        if (filter.name) {
            this.options.name = filter.name;
        } else {
            this.options.name = null
        }
        
        return this.rest.all('albums')
            .getList(this.options)
            .then(response => response)
    }
    
  getCountAlbums(filter) {
    if (filter.name) {
        this.options.name = filter.name
        
        return this.rest.one('albums')
            .customGET("count", this.options)
            .then(response => response)
    } else {
        return this.rest.one('albums')
            .customGET("count")
            .then(response => response)
    }
  }
}

AlbumService.$inject = ['Restangular']

export default AlbumService