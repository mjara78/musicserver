import MusicdirDialogController from './musicdir-dialog.controller'
import BaseNavController from 'common/base-nav.controller'

class LibSettingsController extends BaseNavController {  
  constructor(MessageService, mdDialog, LibraryService, state) {
    super()
  	this.messageService = MessageService;
  	this.mdDialog = mdDialog;
		this.libraryService = LibraryService;
		this.state = state;
		
  }

  $onInit() {
    super.registerNavigation()
  }
  
  refresh () {
   this.libraryService.refreshLibrary()
		.then(
			data => { 
			  this.state.reload()
			    .then( 
			       res => { this.messageService.showMessage('Updating music library...'); } 
			    )
			  }
		 );
  }
  
	editMusicdir (ev, musicdir){
	 var parentEl = angular.element(document.body);
		this.mdDialog.show({
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
	this.libraryService.updateBasedir(basedir)
		.then(
			data => { 
			  this.state.reload()
			    .then(
			       res => { this.messageService.showMessage('Music Directory updated sucessfully.'); }
			    )
			 }
		);
  }
}

LibSettingsController.$inject = ['MessageService', '$mdDialog', 'LibraryService', '$state']

export default LibSettingsController