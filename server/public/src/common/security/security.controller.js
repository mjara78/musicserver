class SecurityController {
    constructor(security) {
      this.$security = security
    }

    $onInit() {
        this.onSecureLoaded({
            $event: {
                userInfo: this.$security.getUser()
            }
        });
    }
    

}

SecurityController.$inject = ['SecurityService']


export default SecurityController