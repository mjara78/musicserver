import MusicdirDialogController from './musicdir-dialog.controller'
import BaseNavController from 'common/base-nav.controller'

class LibSettingsController extends BaseNavController {  
  constructor($msMessage, $mdDialog, $msLibrary, $state) { "ngInject";
    super()
  	this.$msMessage = $msMessage
  	this.$mdDialog = $mdDialog
	this.$msLibrary = $msLibrary
	this.$state = $state
  }

	$onInit() {
		super.updateHeader()
	}
  
	refresh() {
	   this.$msLibrary.refreshLibrary()
			.then(
				data => { 
				  this.$state.reload()
				    .then( 
				       res => { this.$msMessage.showMessage('Updating music library...'); } 
				    )
				  }
			 );
	}
  
	editMusicdir (ev, musicdir){
	 var parentEl = angular.element(document.body);
		this.$mdDialog.show({
			templateUrl : './src/components/settings/lib-settings/musicdir-dialog.html',
			controller :  MusicdirDialogController,
			controllerAs: '$ctrl',
			bindToController: true,
			clickOutsideToClose: true,
			escapeToClose: true,
			parent : parentEl,
			locals : {
				musicdir: musicdir
			}
		});	
	}

  updateBasedir (basedir) {
	this.$msLibrary.updateBasedir(basedir)
		.then(
			data => { 
			  this.$state.reload()
			    .then(
			       res => { this.$msMessage.showMessage('Music Directory updated sucessfully.'); }
			    )
			 }
		);
  }
}

export default LibSettingsController