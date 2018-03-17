import controller from './album-header-select.controller'

export const AlbumHeaderSelectComponent = { 
			bindings: {
				 selected: "<"
			},
			require: {
      parent: '^^msApp'
   },
			controller, 
  templateUrl: 'src/components/album/album-header-select/album-header-select.component.html'
}