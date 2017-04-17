import controller from './menu.controller'


export const MenuComponent = {  
  bindings: {},
  require: {
      parent: '^msApp'
   },
  controller,
  templateUrl: 'src/common/menu/menu.component.html'
}