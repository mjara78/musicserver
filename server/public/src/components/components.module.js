import angular from 'angular'

import genre from './genre'
import home from './home/home.module'

const components = angular  
  .module('app.components', [home, genre])
  .name

export default components  