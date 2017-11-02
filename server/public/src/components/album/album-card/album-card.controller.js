class AlbumCardController {  
  constructor($msPlayer) { "ngInject";
     this.$msPlayer = $msPlayer
  }

  playAlbum(){
    this.$msPlayer.playAlbum(this.album.id);
  }
}

export default AlbumCardController