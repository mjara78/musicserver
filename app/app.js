// /app/app.js
import angular from 'angular'  
import uiRouter from 'angular-ui-router'

import common from './common/common'  
import components from './components/components'  
import { AppComponent } from './app.component'

const root = angular  
  .module('musicserver', [
    uiRouter,
    common,
    components
  ])
  .component('msApp', AppComponent)

document.addEventListener('DOMContentLoaded', () => angular.bootstrap(document, ['musicserver']))

export default root  