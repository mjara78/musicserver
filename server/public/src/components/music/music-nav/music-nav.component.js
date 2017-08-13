import controller from './music-nav.controller.js';
//import './album-card.scss';

export const MusicNavComponent = {
    bindings: {
        $transition$: '<',
        onViewLoaded: "&"
    },
    controller,
    templateUrl: 'src/components/music/music-nav/music-nav.component.html'
}