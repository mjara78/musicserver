import controller from './security.controller' 

export const SecurityComponent = {
    bindings: {
        onSecureLoaded: "&",
        cancelSelected: "<",
        currentTrack: "<"
    },
    controller,
    template: `<ui-view autoscroll='true' cancel-selected='$ctrl.cancelSelected' current-track="$ctrl.currentTrack" />`
}