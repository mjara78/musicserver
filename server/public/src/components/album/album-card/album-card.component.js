import controller from './album-card.controller.js';
import './album-card.scss';

export const AlbumCardComponent = { 
	bindings: {
		album : "<"
	}, 
	controller,
 templateUrl: 'src/components/album/album-card/album-card.component.html'
}