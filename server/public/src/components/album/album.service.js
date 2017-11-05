import GenericResourceService from 'common/services/generic-resource.service'

class AlbumService extends GenericResourceService {  
  constructor (Restangular) { "ngInject";
    super(Restangular)
    
    this.resource = 'albums'
  }

  getRecents () {
    return this.getAll({ limit:'12', order: 'Album.createdAt DESC'})
  }

  getAlbumSongs (idAlbum) {
    return this.Restangular.one('albums', idAlbum).all('songs')
    	.getList({ order: 'track'})
    	.then(	response => response )
  }
  
  fetchPage(offset, limit, filter) {
    var options = {}
    options.order = 'Album.name';
    options.offset = offset;
    options.limit = limit;
 
    if (filter.name) {
      options.name = filter.name;
    }
               
    return this.getAll(options)
  }
    
}

export default AlbumService