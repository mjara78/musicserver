import angular from 'angular'

import { AlbumCardComponent } from './album-card/album-card.component' 
import AlbumService from './album.service'

const album = angular  
  .module('album', [])
  .service('$msAlbum', AlbumService)
  .component('msAlbumCard', AlbumCardComponent)
  .name

export default album 