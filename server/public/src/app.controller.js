class AppController {
    constructor() {
        this.headerTitle = "";

        this.views = new Map();
        this.views.set("home", "Home");
        this.views.set("settings", "Settings");
        this.views.set("music.artists", "Music Explorer");
        this.views.set("music.albums", "Music Explorer");
    }

    setTitle(title) {
        this.headerTitle = title;
    }

    handleViewLoaded($event) {
        if (this.views.has($event.view)) {
            this.headerTitle = this.views.get($event.view);
        } else {
            this.headerTitle = "undefined view";
        }
    }
}

//AppController.$inject = ['$log']

export default AppController