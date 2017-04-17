import angular from 'angular'

//import { GenreItemComponent } from './genre-item/genre-item.component'  
import { RecentsListComponent } from './recents-list/recents-list.component'  
//import GenreService from './genre.service'

const home = angular  
  .module('home', [])
  //.service('GenreService', GenreService)
  //.component('genreItem', GenreItemComponent)
  .component('recentsList', RecentsListComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('home', {
        url: '/',
        component: 'recentsList'/*,
        resolve: {
          genres: GenreService => GenreService.getGenres()
        }*/
      })
    $urlRouterProvider.otherwise('/')
  })
  .name

export default home 