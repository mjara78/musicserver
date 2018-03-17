import controller from './listening-list.controller.js';
import './listening-list.scss';

export const ListeningListComponent = {
    bindings: {
         $transition$: '<',
         currentTrack: "<"
    },
    require: {
      parent: '^^msApp'
    },
    controller,
    templateUrl: 'src/components/listening/listening-list/listening-list.component.html'
}
