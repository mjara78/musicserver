class MusicdirDialogController {  
  constructor($msMessage, $mdDialog, $msLibrary, $state) { "ngInject";
  	this.$msMessage = $msMessage
  	this.$mdDialog = $mdDialog
		this.$msLibrary = $msLibrary
		this.$state = $state
  }
  
  saveMusicdir () {
    this.$msLibrary.updateBasedir(this.musicdir)
		   .then( data => (this.$mdDialog.hide()) )
		   .then( res => (this.$state.reload()) )
		   .then( res => { this.$msMessage.showMessage('Music Directory updated sucessfully.'); } )
  }
  
}

export default MusicdirDialogController