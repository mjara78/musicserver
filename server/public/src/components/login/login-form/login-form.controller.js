class LoginFormController {
    constructor($msSecurity, $msMessage) { "ngInject";
      this.$msSecurity = $msSecurity
      this.$msMessage = $msMessage
      
      this.name = null
      this.password = null
      this.noAdmin = false
    }
    
    $onInit(){
      this.$msSecurity.getCountUserAdmin()
        .then( (count) => {
           this.noAdmin = (count == 0)
        })
    }
    
    login(){
      this.$msSecurity.login(this.name, this.password)
    }   
    
    createAdminUser(){
      this.$msSecurity.createUserAdmin()
        .then( (result) => {
           this.noAdmin = false
           this.$msMessage.showMessage("Admin user created. Check log for password.",6000)
        })
    }

}

export default LoginFormController