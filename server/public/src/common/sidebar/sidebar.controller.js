class SidebarController {  
  constructor($mdSidenav) {
    this.mdSidenav = $mdSidenav;
  }

  toggleMenu() {
    this.mdSidenav('menu').toggle();
  }
}

SidebarController.$inject = ['$mdSidenav']

export default SidebarController