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
                    skip: ['$msSecurity', $msSecurity => $msSecurity.skipIfAuthenticate()]
                }
            })
    }])
    .name

export default login