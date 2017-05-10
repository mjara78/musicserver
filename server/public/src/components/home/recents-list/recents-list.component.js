import controller from './recents-list.controller'

export const RecentsListComponent = {  
  bindings: { 
    	recents: "<"
  },
  require: { parent: "^msApp"},
  controller,
  templateUrl: 'src/components/home/recents-list/recents-list.component.html'
}