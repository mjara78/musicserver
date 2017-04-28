import MusicdirDialogController from './musicdir-dialog.controller'

class LibSettingsController {  
  constructor(media, MessageService, mdDialog, LibraryService, state) {
  	this.media = media;
  	this.messageService = MessageService;
  	this.mdDialog = mdDialog;
		this.libraryService = LibraryService;
		this.state = state;

  	this.density = "";
  }

  $onInit () {
    this.parent.setTitle("Settings");
    if (this.media('xs')) {
  				this.density = 'md-dense';
  			}
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
  
  editBasedir (ev,initial) {
  	var confirm = this.mdDialog.prompt()
  		.title('Edit Music Directory')
  		.placeholder('Music Directory')
  		.ariaLabel('Music Directory')
  		.initialValue(initial)
  		.targetEvent(ev)
  		.ok('Save')
  		.cancel('Cancel');
  		
  	this.mdDialog.show(confirm)
		.then( 
			result => {	this.updateBasedir(result); }
		);
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

LibSettingsController.$inject = ['$mdMedia', 'MessageService', '$mdDialog', 'LibraryService', '$state']

export default LibSettingsController