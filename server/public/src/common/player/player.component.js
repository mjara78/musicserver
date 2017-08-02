import controller from './player.controller'
import './player.scss';

export const PlayerComponent = { 
			bindings: {
		//	  player : '='
			},
			controller, 
  templateUrl: 'src/common/player/player.component.html'
}