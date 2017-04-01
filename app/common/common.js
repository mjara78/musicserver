// /app/common/common.js
import angular from 'angular'

import { HeaderComponent } from './header/header.component'  
import { FooterComponent } from './footer/footer.component'

const common = angular  
  .module('app.common', [])
  .component('msHeader', HeaderComponent)
  .component('msFooter', FooterComponent)
  .name

export default common