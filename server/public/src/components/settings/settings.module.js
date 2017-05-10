import angular from 'angular'

import { LibSettingsComponent } from './lib-settings/lib-settings.component'  
import LibraryService from './library.service'

const settings = angular  
  .module('settings', [])
  .service('LibraryService', LibraryService)
  .component('libSettings', LibSettingsComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('settings', {
        url: '/settings',
        component: 'libSettings',
        resolve: {
          library: LibraryService => LibraryService.getLibrary()
        }
      })
    $urlRouterProvider.otherwise('/')
  })
  .name

export default settings 