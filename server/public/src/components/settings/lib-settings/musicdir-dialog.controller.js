class MusicdirDialogController {  
  constructor(MessageService, mdDialog, LibraryService, state) {
  	this.messageService = MessageService;
  	this.mdDialog = mdDialog;
		this.libraryService = LibraryService;
		this.state = state;
  }
  
  saveMusicdir () {
    this.libraryService.updateBasedir(this.musicdir)
		   .then( data => (this.mdDialog.hide()) )
		   .then( res => (this.state.reload()) )
		   .then( res => { this.messageService.showMessage('Music Directory updated sucessfully.'); } );
  }
  
}

MusicdirDialogController.$inject = ['MessageService', '$mdDialog', 'LibraryService', '$state']

export default MusicdirDialogController