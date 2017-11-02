class AlbumService {  
  constructor (Restangular) { "ngInject";
    this.Restangular  = Restangular
    this.options = {};
  }

  getRecents () {
    return this.Restangular.all('albums')
    	.getList({ limit:'12', order: 'Album.createdAt DESC'})
    	.then(	response => response )
  }

  getAlbumSongs (idAlbum) {
    return this.Restangular.one('albums', idAlbum).all('songs')
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
        
        return this.Restangular.all('albums')
            .getList(this.options)
            .then(response => response)
    }
    
  getCountAlbums(filter) {
    if (filter.name) {
        this.options.name = filter.name
        
        return this.Restangular.one('albums')
            .customGET("count", this.options)
            .then(response => response)
    } else {
        return this.Restangular.one('albums')
            .customGET("count")
            .then(response => response)
    }
  }
}

export default AlbumService