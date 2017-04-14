
import angular from 'angular'

import { HeaderComponent } from './header/header.component'  
import { MenuComponent } from './menu/menu.component'
import MenuService from './menu/menu.service'

const common = angular  
  .module('app.common', [])
  .service('MenuService', MenuService)
  .component('msHeader', HeaderComponent)
  .component('msMenu', MenuComponent)
  .name

export default common