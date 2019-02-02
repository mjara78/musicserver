import GenericResourceService from 'common/services/generic-resource.service'

class AlbumService extends GenericResourceService {  
  constructor (Restangular) { "ngInject";
    super(Restangular)
    
    this.resource = 'albums'
  }

  getRecents () {
    return this.getAll({ limit:'12', order: 'createdAt', orderType: 'desc'})
  }

  // Get all songs by album id
  getAlbumSongs (idAlbum, options) {
    if (!options){ // Default Order by track
      options = { order: 'track'}
   //   options.debug = true
    }
    return this.Restangular.one('albums', idAlbum).all('songs')
    	.getList(options)
    	.then(	response => response )
  }
  
  fetchPage(offset, limit, filter) {
    var options = {}
    options.order = 'albumName';
    options.offset = offset;
    options.limit = limit;
 
    if (filter.name) {
      options.albumName = filter.name;
      options.regexp = true;
    }
               
    return this.getAll(options)
  }

  getCount(filter) {
    var options = {}
    if (filter.name) {
      options.albumName = filter.name
    } else {
      options.albumName = null
    }

    return this.getCountAll(this.options);
  }
    
}

export default AlbumService