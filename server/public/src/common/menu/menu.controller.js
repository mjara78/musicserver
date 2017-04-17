class MenuController {  
  constructor($mdSidenav, MenuService, $state) {
    this.mdSidenav = $mdSidenav;
    this.menuService = MenuService;
    this.state = $state;
    this.options = [];
    
    // Load menu options
    this.loadData();
  }

  toggleMenu() {
    this.mdSidenav('menu').toggle();
  }
  
  loadData () {
    this.options = this.menuService.getMenuOptions()
      .then( data => {
            this.options = data;
    });
	}
		
	selectOption (option){
				this.toggleMenu();
				this.state.go(option);
	}
}

MenuController.$inject = ['$mdSidenav','MenuService','$state']

export default MenuController