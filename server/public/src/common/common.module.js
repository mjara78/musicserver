import angular from 'angular'

// compoments
import { HeaderComponent } from './header/header.component'
import { MenuComponent } from './menu/menu.component'
import { PlayerComponent } from './player/player.component'
import { SecurityComponent } from './security/security.component'

// services
import MenuService from './menu/menu.service'
import MessageService from './message/message.service'
import PlayerService from './player/player.service'
import AlbumService from '../components/album/album.service'
import SecurityService from './security/security.service'

const common = angular
    .module('app.common', [])
    .service('MenuService', MenuService)
    .service('MessageService', MessageService)
    .service('PlayerService', PlayerService)
    .service('AlbumService', AlbumService)
    .service('SecurityService', SecurityService)
    .component('msHeader', HeaderComponent)
    .component('msMenu', MenuComponent)
    .component('msPlayer', PlayerComponent)
    .component('msSecurity', SecurityComponent)
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('secure', {
                url: '/secure',
                abstract: true,
                component: 'msSecurity',
                resolve: {
                    access: ['SecurityService', SecurityService => SecurityService.redirectIfNotAuthenticated()]
                }
            })
        $urlRouterProvider.otherwise('/')
    }])
    .run(['Restangular', 'MessageService',
        function(Restangular, MessageService) {
            Restangular.setErrorInterceptor(
                function(response) {

                    if (response.status == 418) { // Bussness Logic Error
                        MessageService.showMessage(response.data.message);
                    } else { // Other Errors
                        MessageService.showMessageError(response.data);
                    }

                    return false; // stop the promise chain
                }
            );
        }
    ])
    .name

export default common