class LoginFormController {
    constructor(securityService, messageService) {
      this.name = null
      this.password = null
      this.securityService = securityService
      this.messageService = messageService
      
      this.noAdmin = false
    }
    
    $onInit(){
      this.securityService.getCountUserAdmin()
        .then( (count) => {
           this.noAdmin = (count == 0)
        })
    }
    
    login(){
      this.securityService.login(this.name, 
                                 this.password)
    }   
    
    createAdminUser(){
      this.securityService.createUserAdmin()
        .then( (result) => {
           this.noAdmin = false
           this.messageService.showMessage("Admin user created. Check log for password.",6000)
        })
    }

}

LoginFormController.$inject = ['SecurityService', 'MessageService']

export default LoginFormController