import controller from './header.controller'

export const HeaderComponent = { 
			bindings: {
				 headerInfo: "<"
			},
			controller, 
  templateUrl: 'src/common/header/header.component.html'
}