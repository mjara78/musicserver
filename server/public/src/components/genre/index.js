import angular from 'angular'

import { GenreItemComponent } from './genre-item/genre-item.component'  
import { GenreListComponent } from './genre-list/genre-list.component'  
import GenreService from './genre.service'

const genre = angular  
  .module('genre', [])
  .service('GenreService', GenreService)
  .component('genreItem', GenreItemComponent)
  .component('genreList', GenreListComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('genres', {
        url: '/genres',
        component: 'genreList'/*,
        resolve: {
          genres: GenreService => GenreService.getGenres()
        }*/
      })
    $urlRouterProvider.otherwise('/')
  })
  .name

export default genre 