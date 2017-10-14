import controller from './music-nav.controller.js';
import './music-nav.scss';

export const MusicNavComponent = {
    bindings: { 
    	  $transition$: '<'
    },
    require: {
       parent: '^^msApp'
    },
    controller,
    templateUrl: 'src/components/music/music-nav/music-nav.component.html'
}