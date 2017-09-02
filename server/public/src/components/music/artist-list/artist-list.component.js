import controller from './artist-list.controller.js';
import './artist-list.scss';

export const ArtistListComponent = {
     bindings: {
         filter: "<",
         onTabPageLoaded: "&"
     },
    controller,
    templateUrl: 'src/components/music/artist-list/artist-list.component.html'
}