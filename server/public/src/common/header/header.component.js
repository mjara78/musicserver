import controller from './header.controller'

export const HeaderComponent = { 
			bindings: {
				title: "<"
			},
			controller, 
  templateUrl: 'src/common/header/header.component.html'
}