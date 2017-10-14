import controller from './security.controller' 

export const SecurityComponent = {
    bindings: {
        onSecureLoaded: "&"
    },
    controller,
    template: `<ui-view />`
}