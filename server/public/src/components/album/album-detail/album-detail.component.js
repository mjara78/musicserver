import controller from './album-detail.controller'
import './album-detail.scss'

export const AlbumDetailComponent = {  
  bindings: { 
   	album: "<",
   	$transition$: '<' ,
   	cancelSelected: "<"
  	},
  	require: {
      parent: '^^msApp'
   },
  controller,
  templateUrl: 'src/components/album/album-detail/album-detail.component.html'
}
