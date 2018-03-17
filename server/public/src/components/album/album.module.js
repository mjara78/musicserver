import angular from 'angular'

import { AlbumCardComponent } from './album-card/album-card.component'
import { AlbumDetailComponent } from './album-detail/album-detail.component' 
import { AlbumHeaderComponent } from './album-header/album-header.component'
import { AlbumHeaderSelectComponent } from './album-header-select/album-header-select.component'
import AlbumService from './album.service'

const album = angular  
  .module('album', [])
  .service('$msAlbum', AlbumService)
  .component('msAlbumCard', AlbumCardComponent)
  .component('msAlbumDetail', AlbumDetailComponent)
  .component('msAlbumHeader', AlbumHeaderComponent)
  .component('msAlbumHeaderSelect', AlbumHeaderSelectComponent)
  .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('secure.album', {
                url: '/album/{idAlbum}',
                component: 'msAlbumDetail',
                resolve: {
                    album: ['$msAlbum', '$stateParams', ($msAlbum, $stateParams) => $msAlbum.getOne($stateParams.idAlbum)]
                }
            })
        $urlRouterProvider.otherwise('/')
    }])
  .name

export default album 