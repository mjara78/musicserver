import angular from 'angular'

import { RecentsListComponent } from './recents-list/recents-list.component'  
import RecentsService from './recents.service'

const home = angular  
  .module('home', [])
  .service('RecentsService', RecentsService)
  .component('recentsList', RecentsListComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('home', {
        url: '/',
        component: 'recentsList',
        resolve: {
          recents: RecentsService => RecentsService.getRecents()
        }
      })
    $urlRouterProvider.otherwise('/')
  })
  .name

export default home 