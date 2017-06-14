
import angular from 'angular'

// compoments
import { HeaderComponent } from './header/header.component'  
import { MenuComponent } from './menu/menu.component'
import { PlayerComponent } from './player/player.component'
//import { AlbumCardComponent } from './album/album-card/album-card.component'

// services
import MenuService from './menu/menu.service'
import MessageService from './message/message.service'
import PlayerService from './player/player.service'
//import AlbumService from './album/album.service'

const common = angular  
  .module('app.common', [])
  .service('MenuService', MenuService)
  .service('MessageService', MessageService)
  .service('PlayerService', PlayerService)
  .component('msHeader', HeaderComponent)
  .component('msMenu', MenuComponent)
  .component('msPlayer', PlayerComponent)
  .run(['Restangular', 'MessageService', 
    function(Restangular, MessageService){
      Restangular.setErrorInterceptor(
          function(response) {

            if (response.status == 418) { // Bussness Logic Error
              MessageService.showMessage(response.data.message);
            }
            else { // Other Errors
              MessageService.showMessageError(response.data);
            }
            
            return false; // stop the promise chain
          }
      );
    }])
  .name

export default common