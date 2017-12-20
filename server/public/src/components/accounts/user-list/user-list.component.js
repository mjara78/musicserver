import controller from './user-list.controller'
import './user-list.scss'

export const UserListComponent = {  
  bindings: { 
   	users: "<",
   	$transition$: '<' 
  	},
  	require: {
      parent: '^^msApp'
   },
  controller,
  templateUrl: 'src/components/accounts/user-list/user-list.component.html'
}
