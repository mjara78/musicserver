import controller from './menu.controller'
import './menu.scss'

export const MenuComponent = {  
  bindings: {
    userInfo: "<"
  },
  controller,
  templateUrl: 'src/common/menu/menu.component.html'
}