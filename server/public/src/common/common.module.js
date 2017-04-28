
import angular from 'angular'

import { HeaderComponent } from './header/header.component'  
import { MenuComponent } from './menu/menu.component'
import MenuService from './menu/menu.service'
import MessageService from './message/message.service'

const common = angular  
  .module('app.common', [])
  .service('MenuService', MenuService)
  .service('MessageService', MessageService)
  .component('msHeader', HeaderComponent)
  .component('msMenu', MenuComponent)
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