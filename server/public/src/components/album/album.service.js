class AlbumService {  
  constructor (rest) {
    this.rest  = rest;
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
}

AlbumService.$inject = ['Restangular']

export default AlbumService