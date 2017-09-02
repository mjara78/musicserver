import controller from './album-list.controller.js';
import './album-list.scss';

export const AlbumListComponent = {
    bindings: {
         filter: "<",
         onTabPageLoaded: "&"
    },
    controller,
    templateUrl: 'src/components/music/album-list/album-list.component.html'
}