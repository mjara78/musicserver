
import angular from 'angular'

import { HeaderComponent } from './header/header.component'  
import { SidebarComponent } from './sidebar/sidebar.component'

const common = angular  
  .module('app.common', [])
  .component('msHeader', HeaderComponent)
  .component('msSidebar', SidebarComponent)
  .name

export default common