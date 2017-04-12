class HeaderController {  
  constructor($mdSidenav) {
    this.mdSidenav = $mdSidenav;
  }

  toggleMenu() {
    this.mdSidenav('menu').toggle();
  }
}

HeaderController.$inject = ['$mdSidenav']

export default HeaderController