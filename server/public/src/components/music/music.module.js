import angular from 'angular'

import { MusicNavComponent } from './music-nav/music-nav.component'
import { ArtistListComponent } from './artist-list/artist-list.component'

const music = angular
    .module('music', [])
    .component('musicNav', MusicNavComponent)
    .component('artistList', ArtistListComponent)
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('music', {
                url: '/music',
                component: 'musicNav'
            })
            .state('music.artists', {
                url: '/artists',
                component: 'artistList',
                resolve: {
                    artists: ['ArtistService', ArtistService => ArtistService.getArtists()]
                }
            })
            .state('music.albums', {
                url: '/albums',
                component: 'recentsList',
                resolve: {
                    recents: ['AlbumService', AlbumService => AlbumService.getRecents()]
                }
            })
        $urlRouterProvider.otherwise('/')
    }])
    .name

export default music