import angular from 'angular'

import { MusicNavComponent } from './music-nav/music-nav.component'
import { ArtistListComponent } from './artist-list/artist-list.component'
import { AlbumListComponent } from './album-list/album-list.component'

const music = angular
    .module('music', [])
    .component('musicNav', MusicNavComponent)
    .component('artistList', ArtistListComponent)
    .component('albumList', AlbumListComponent)
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('secure.music', {
                url: '/music',
                component: 'musicNav'
            })
            .state('secure.music.artists', {
                url: '/artists',
                component: 'artistList'
            })
            .state('secure.music.albums', {
                url: '/albums',
                component: 'albumList'
            })
        $urlRouterProvider.otherwise('/')
    }])
    .name

export default music