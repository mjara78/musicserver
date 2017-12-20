import AccountDialogController from './account-dialog.controller'
import BaseNavController from 'common/base-nav.controller'

class UserListController extends BaseNavController {  
  constructor($mdDialog, $timeout) { "ngInject";
    super()
  
  	this.$mdDialog = $mdDialog
  	this.$timeout = $timeout

  	this.selectedAll = false
  	this.selected = []
  	this.showContextMenu = false
  }

	$onInit() {
		super.registerNavigation()
	}
    
	addAccount (ev){
		var userParam = {
			id: null,
      		name: null,
      		isAdmin: false,
      		password: null,
      		password2: null
    	}

	 	var parentEl = angular.element(document.body);
		this.$mdDialog.show({
			templateUrl : './src/components/accounts/user-list/account-dialog.html',
			controller :  AccountDialogController,
			controllerAs: '$ctrl',
			bindToController: true,
			clickOutsideToClose: true,
			escapeToClose: true,
			parent : parentEl,
			locals: {
				titleDialog: "Create Account",
				user: userParam
			}
		});	
	}

	editAccount (ev, userParam){
	 	var parentEl = angular.element(document.body);
		this.$mdDialog.show({
			templateUrl : './src/components/accounts/user-list/account-dialog.html',
			controller :  AccountDialogController,
			controllerAs: '$ctrl',
			bindToController: true,
			clickOutsideToClose: true,
			escapeToClose: true,
			parent : parentEl,
			locals : {
				titleDialog: "Edit Account",
				user: userParam
			}
		});	
	}

	toggleCheckboxs(){
		if (this.selectedAll){
			this.selected = []
			this.selectedAll = false
		} else {
			this.selected = this.users.map(function(item) { return item.id })	
			this.selectedAll = true
		}

		this.testSelected()		
	}

	testSelected(){
		this.$timeout(() => {
        	if(this.selected.length > 0){
				this.showContextMenu = true
			}
			else{
				this.showContextMenu = false
			}
        });
	}
}

export default UserListController