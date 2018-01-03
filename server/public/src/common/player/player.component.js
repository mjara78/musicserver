import controller from './player.controller'
import './player.scss';

export const PlayerComponent = { 
	require: {
      parent: '^^msApp'
   	},
   	controller,
   	templateUrl: 'src/common/player/player.component.html'
}