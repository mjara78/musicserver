import angular from 'angular'

import { LoginFormComponent } from './login-form/login-form.component'

const login = angular
    .module('login', [])
    .component('loginForm', LoginFormComponent)
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('login', {
                url: '/',
                component: 'loginForm',
                resolve: {
                    skip: ['SecurityService', SecurityService => SecurityService.skipIfAuthenticate()]
                }
            })
    }])
    .name

export default login