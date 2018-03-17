class HeaderController {  
  constructor($mdSidenav) { "ngInject";
    this.$mdSidenav = $mdSidenav;
    
    this.hideGenericToolbar = false
  }

  $onChanges(change){ 
  
    // If has defined a custom header hide generic toolbar
    if (this.headerInfo){
      if ( this.headerInfo.customHeader != null ){
        this.hideGenericToolbar = true
      } else {
        this.hideGenericToolbar = false
      }  
    } else {

      this.hideGenericToolbar = false
    }
    
  }

  toggleMenu() {
    this.$mdSidenav('menu').toggle();
  }
}

export default HeaderController