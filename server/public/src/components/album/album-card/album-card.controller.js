class AlbumCardController {  
  constructor($msPlayer, $msMessage, $state ) { "ngInject";
     this.$msPlayer = $msPlayer
     this.$msMessage = $msMessage
     this.$state = $state
  }

  playAlbum(options){
    this.$msPlayer.playAlbum(this.album.id, options)
  }
  
  addAlbumToPlaylist(){
    this.$msPlayer.addAlbumToPlaylist(this.album.id)
    this.$msMessage.showMessage("Album added to playlist")
  }
  
  doSomething(){
    this.$msMessage.showMessage("Coming Soon!!")
  }
  
  goAlbum(){
    this.$state.go('secure.album', { idAlbum: this.album.id })
  }
  
}

export default AlbumCardController