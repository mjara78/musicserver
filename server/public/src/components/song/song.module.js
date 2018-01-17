import angular from 'angular'

import SongService from './song.service'

const song = angular  
  .module('song', [])
  .service('$msSong', SongService)
  .name

export default song