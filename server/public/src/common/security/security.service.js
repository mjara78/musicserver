class SecurityService {
    constructor($auth, $q, $state, $timeout, Restangular, $sessionStorage) { "ngInject";
        this.$auth = $auth
        this.$q = $q
        this.$state = $state
        this.$timeout = $timeout
        this.Restangular = Restangular
        this.$sessionStorage = $sessionStorage
        
        this.options = {}
        this.$auth.setStorageType('sessionStorage')
    }

    skipIfAuthenticate() {
        var defer = this.$q.defer();
        if (this.$auth.isAuthenticated()) {
            this.$timeout(() => {
                this.$state.go('secure.home')
            });
            defer.reject();
        } else {
            defer.resolve();
        }
        return defer.promise;
    }

    redirectIfNotAuthenticated() {
        var defer = this.$q.defer();
        if (this.$auth.isAuthenticated()) {
            defer.resolve();
        } else {
            this.$timeout(() => {
                this.$state.go('login')
            });
            defer.reject();
        }
        return defer.promise;
    }
    
    login(name, password){
       this.$auth.login({
        	name: name,
         password: password
        })
        .then( (response) => {
           this.$sessionStorage.user = response.data.user
           this.$timeout(() => {
                this.$state.go('secure.home')
            },100);
        })
        .catch( (response) => {
        	  this.$message.showMessageError(response.data)
        });
    }
    
    isAuthenticated(){
       return this.$auth.isAuthenticated()
    }
    
    getCountUserAdmin() {
        this.options.isAdmin = true
        
        return this.Restangular.one('users')
            .customGET("count", this.options)
            .then(response => response)
    }
    
    createUserAdmin(){
      return this.Restangular.one('users')
            .customPOST({}, "default")
            .then(response => response)
    }
    
    getUser(){
      return this.$sessionStorage.user
    }
    
    logout(){
      this.$auth.logout()
      this.$sessionStorage.user = null
    }
}

export default SecurityService