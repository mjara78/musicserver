class MenuController {  
  constructor($mdSidenav, $msMenu, $state, $msSecurity) { "ngInject";
    this.$mdSidenav = $mdSidenav
    this.$msMenu = $msMenu
    this.$state = $state
    this.$msSecuriry = $msSecurity
    
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
    this.options = this.$msMenu.getMenuOptions()
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
	   this.$msSecuriry.logout()
	   this.$state.go("login")
	 }
}

export default MenuController