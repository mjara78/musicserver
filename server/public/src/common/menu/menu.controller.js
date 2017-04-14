class MenuController {  
  constructor($mdSidenav, MenuService) {
    this.mdSidenav = $mdSidenav;
    this.menuService = MenuService;
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
		
		selectOption (option, label){
					this.menuService.selectMenuOpt(option,label);
		}
}

MenuController.$inject = ['$mdSidenav','MenuService']

export default MenuController