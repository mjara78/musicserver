import angular from 'angular'

import { LibSettingsComponent } from './lib-settings/lib-settings.component'
import LibraryService from './library.service'

const settings = angular
    .module('settings', [])
    .service('$msLibrary', LibraryService)
    .component('libSettings', LibSettingsComponent)
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('secure.settings', {
                url: '/settings',
                component: 'libSettings',
                resolve: {
                    library: ['$msLibrary', $msLibrary => $msLibrary.getLibrary()]
                }
            })
        $urlRouterProvider.otherwise('/')
    }])
    .name

export default settings