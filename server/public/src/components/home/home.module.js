import angular from 'angular'

import { RecentsListComponent } from './recents-list/recents-list.component'  

const home = angular  
  .module('home', [])
  //.service('RecentsService', RecentsService)
  .component('recentsList', RecentsListComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('home', {
        url: '/',
        component: 'recentsList',
        resolve: {
          recents: AlbumService => AlbumService.getRecents()
        }
      })
    $urlRouterProvider.otherwise('/')
  })
  .name

export default home 