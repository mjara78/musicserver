import controller from './recents-list.controller'

export const RecentsListComponent = {  
  bindings: { },
  require: { parent: "^msApp"},
  controller,
  template: `
    Recents List
  `
}