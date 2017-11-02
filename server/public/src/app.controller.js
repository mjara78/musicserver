class AppController {
    constructor($msSecurity) { "ngInject";
        this.$msSecurity = $msSecurity
        
        this.headerTitle = "";
        this.userInfo = null

        this.views = new Map();
        this.views.set("secure.home", "Home");
        this.views.set("secure.settings", "Settings");
        this.views.set("secure.music.artists", "Music Explorer");
        this.views.set("secure.music.albums", "Music Explorer");
    }

    handleViewLoaded(view) {
     
        if (this.views.has(view)) {
            this.headerTitle = this.views.get(view);
        } else {
            this.headerTitle = "undefined view";
        }
        
    }
    
    handleUserLoaded($event) {
        
        this.userInfo = $event.userInfo
    }
    
    userAuthenticated(){
      return this.$msSecurity.isAuthenticated();
    }
}

export default AppController