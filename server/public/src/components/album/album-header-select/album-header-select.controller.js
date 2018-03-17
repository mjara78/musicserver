class AlbumHeaderSelectController {  
  constructor() { "ngInject";
  }
  
  cancel(){
    this.parent.updateSelected({
      cancelSelected: true
    })
  }
}

export default AlbumHeaderSelectController