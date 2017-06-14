import angular from 'angular'

import home from './home/home.module'
import settings from './settings/settings.module'
import album from './album/album.module'

const components = angular  
  .module('app.components', [album, home, settings])
  .name

export default components  