class AccountDialogController {  
  constructor($msMessage, $mdDialog, $msUser, $state) { "ngInject";
  	this.$msMessage = $msMessage
  	this.$mdDialog = $mdDialog
		this.$msUser = $msUser
		this.$state = $state
  }

  createAccount(form){
   
    if (form.$invalid){
     // form.password2.$error.passwordsNotMatch = true
    } else {
      this.$msUser.post(this.user)
       .then( data => (this.$mdDialog.hide()) )
       .then( res => (this.$state.reload()) )
       .then( res => { this.$msMessage.showMessage('Account created sucessfully.'); } )
    }
  }

  validatePassword(form){
    if (this.user.password != this.user.password2){
      form.password2.$setValidity('passwordsMatch', false);
    } else {
      form.password2.$setValidity('passwordsMatch', true);
    }
  }

  editAccount(){

  }

  save(form){
    if (this.user.id) {
      this.editAccount()
    } else {
      this.createAccount(form)
    }
  }
  
}

export default AccountDialogController