class RecentsListController {  
  constructor() {
  }

  $onInit () {
    //this.parent.setTitle("Home");
    //console.log("trans:"+this.$transition$.to().name);
    this.onViewLoaded({
      $event: {
        view : this.$transition$.to().name
      }
    });
    
  }
  
}

RecentsListController.$inject = ['AlbumService']

export default RecentsListController