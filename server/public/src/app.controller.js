class AppController {
    constructor($msSecurity) { "ngInject";
        this.$msSecurity = $msSecurity

        this.userInfo = null
        this.currentTrack = null
        this.headerInfo = null
        
        this.cancelSelected = false

        this.views = new Map();
        this.views.set("secure.home", "Home");
        this.views.set("secure.settings", "Settings");
        this.views.set("secure.music.artists", "Music Explorer");
        this.views.set("secure.music.albums", "Music Explorer");
        this.views.set("secure.accounts", "Manage Users Accounts");
        this.views.set("secure.listening", "Listening");
        this.views.set("secure.album", "Album Detail");

    }

    handleViewLoaded($event) {
    
        this.headerInfo = $event
        
        if (this.views.has($event.view)) {
            this.headerInfo.title = this.views.get($event.view);
        } else {
            this.headerInfo.title = "undefined view";
        }

    }

    handleUserLoaded($event) {

        this.userInfo = $event.userInfo
    }

    userAuthenticated(){
      return this.$msSecurity.isAuthenticated();
    }

    handlePlayingTrack($event){
        this.currentTrack = $event.currentSong    
    }
    
    updateSelected($event){
      this.cancelSelected = $event.cancelSelected
    }
}

export default AppController
