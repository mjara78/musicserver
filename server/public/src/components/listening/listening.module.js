import angular from 'angular'

import { ListeningListComponent } from './listening-list/listening-list.component'

const listening = angular
  .module('listening', [])
  .component('msListeningList', ListeningListComponent)
  .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('secure.listening', {
                url: '/listening',
                component: 'msListeningList'
            })
        $urlRouterProvider.otherwise('/')
    }])
    .name

export default listening
