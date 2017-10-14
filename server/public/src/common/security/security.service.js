class SecurityService {
    constructor(auth, q, state, timeout, message, rest, storage) {
        this.$auth = auth
        this.$q = q
        this.$state = state
        this.$timeout = timeout
        this.$messageService = message
        this.$rest = rest
        this.$storage = storage
        
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
           this.$storage.user = response.data.user
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
        
        return this.$rest.one('users')
            .customGET("count", this.options)
            .then(response => response)
    }
    
    createUserAdmin(){
      return this.$rest.one('users')
            .customPOST({}, "default")
            .then(response => response)
    }
    
    getUser(){
      return this.$storage.user
    }
    
    logout(){
      this.$auth.logout()
      this.$storage.user = null
    }
}

SecurityService.$inject = ['$auth', '$q', '$state', '$timeout', 'MessageService', 'Restangular', '$sessionStorage']

export default SecurityService