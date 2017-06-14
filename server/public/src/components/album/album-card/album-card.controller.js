class AlbumCardController {  
  constructor() {
  }

  $onInit(){
    console.log("album:"+ this.data.name);
  }
}

//AlbumCardController.$inject = ['$mdSidenav']

export default AlbumCardController