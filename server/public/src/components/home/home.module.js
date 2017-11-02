import angular from 'angular'

import { RecentsListComponent } from './recents-list/recents-list.component'

const home = angular
    .module('home', [])
    .component('recentsList', RecentsListComponent)
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('secure.home', {
                url: '/home',
                component: 'recentsList',
                resolve: {
                    recents: ['$msAlbum', $msAlbum => $msAlbum.getRecents()]
                }
            })
        $urlRouterProvider.otherwise('/')
    }])
    .name

export default home