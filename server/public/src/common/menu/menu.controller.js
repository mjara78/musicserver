class MenuController {  
  constructor(mdSidenav, menu, state, security) {
    this.$mdSidenav = mdSidenav;
    this.$menu = menu;
    this.$state = state;
    this.$security = security
    
    this.options = [];
    this.showUserMenu = false
    
    // Load menu options
    this.loadData();
  }

  $onInit(){
   
  }

  toggleMenu() {
    this.$mdSidenav('menu').toggle();
  }
  
  loadData() {
    this.options = this.$menu.getMenuOptions()
      .then( data => {
            this.options = data;
    });
	 }
		
	selectOption(option){
				this.toggleMenu();
				this.$state.go(option);
	}
	
	toggleUserMenu(){
	  if(this.showUserMenu){
	    this.showUserMenu = false
	  } else {
	    this.showUserMenu = true
	  }
	}
	
	 logout(){
	   this.toggleUserMenu()
	   this.toggleMenu()
	   this.$security.logout()
	   this.$state.go("login")
	 }
}

MenuController.$inject = ['$mdSidenav','MenuService','$state', 'SecurityService']

export default MenuController