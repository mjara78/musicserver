import angular from 'angular'

import { UserListComponent } from './user-list/user-list.component'
import UserService from './user.service'

const accounts = angular
    .module('accounts', [])
    .service('$msUser', UserService)
    .component('msUserList', UserListComponent)
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('secure.accounts', {
                url: '/accounts',
                component: 'msUserList',
                resolve: {
                    users: ['$msUser', $msUser => $msUser.getAll({})]
                }
            })
        $urlRouterProvider.otherwise('/')
    }])
    .name

export default accounts