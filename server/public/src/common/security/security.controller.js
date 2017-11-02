class SecurityController {
    constructor($msSecurity) { "ngInject";
      this.$msSecurity = $msSecurity
    }

    $onInit() {
        this.onSecureLoaded({
            $event: {
                userInfo: this.$msSecurity.getUser()
            }
        });
    }
    

}

export default SecurityController