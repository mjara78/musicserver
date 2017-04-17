import angular from 'angular'

import genre from './genre'
import home from './home/home.module'
import settings from './settings/settings.module'

const components = angular  
  .module('app.components', [home, genre, settings])
  .name

export default components  