class AlbumCardController {  
  constructor(PlayerService) {
     this.playerService = PlayerService;
  }

  playAlbum(){
    this.playerService.playAlbum(this.album.id);
  }
}

AlbumCardController.$inject = ['PlayerService']

export default AlbumCardController