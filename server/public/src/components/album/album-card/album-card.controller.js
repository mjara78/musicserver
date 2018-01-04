class AlbumCardController {  
  constructor($msPlayer, $msMessage ) { "ngInject";
     this.$msPlayer = $msPlayer
     this.$msMessage = $msMessage
  }

  playAlbum(){
    this.$msPlayer.playAlbum(this.album.id)
    this.$msMessage.showMessage("Playing album")
  }
  
  addAlbumToPlaylist(){
    this.$msPlayer.addAlbumToPlaylist(this.album.id)
    this.$msMessage.showMessage("Album added to playlist")
  }
  
  doSomething(){
    this.$msMessage.showMessage("Coming Soon!!")
  }
  
}

export default AlbumCardController