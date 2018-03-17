import controller from './album-header.controller'

export const AlbumHeaderComponent = { 
			bindings: {
				 album: "<"
			},
			controller, 
  templateUrl: 'src/components/album/album-header/album-header.component.html'
}