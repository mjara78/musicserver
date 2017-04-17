import angular from 'angular'

//import { GenreItemComponent } from './genre-item/genre-item.component'  
import { LibSettingsComponent } from './lib-settings/lib-settings.component'  
//import GenreService from './genre.service'

const settings = angular  
  .module('settings', [])
  //.service('GenreService', GenreService)
  //.component('genreItem', GenreItemComponent)
  .component('libSettings', LibSettingsComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('settings', {
        url: '/settings',
        component: 'libSettings'/*,
        resolve: {
          genres: GenreService => GenreService.getGenres()
        }*/
      })
    $urlRouterProvider.otherwise('/')
  })
  .name

export default settings 