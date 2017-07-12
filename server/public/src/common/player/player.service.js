class PlayerService {  
  constructor (angularPlayer, AlbumService) {
    this.angularPlayer = angularPlayer;
    this.albumService = AlbumService;
  }

  setPosition(pos){
    this.angularPlayer.setPosition(pos);
  }
	
  getDuration(){
    return this.angularPlayer.getDuration();
  }
  
  playAlbum(id){
    this.albumService.getAlbumSongs(id)
      .then( songs => {
         // Clear playlist
       //  console.log("clear")
         
         this.angularPlayer.clearPlaylist( data => {
         
          // console.log("songs " + songs.length)
         
           //Populate new playlist
           for (let song of songs){
             let track = {
               url : 'listen/' + song.id,
               id : '#'+song.id,
               title : song.title,
               track : song.track,
               album : song.Album.name,
               artist : song.Artist.name,
               imageUrlSmall : song.Album.imageUrlSmall,
               imageUrlLarge : song.Album.imageUrlLarge
             };
           
            // console.log("track "+ track) ;
             
           //  console.log("url "+ track.url)
           
             // Add to playlist
             this.angularPlayer.addTrack(track);
           //  console.log("track added "+ track.title)
           }
         
           // Play first track of new playlist
           this.angularPlayer.playTrack(this.angularPlayer.getPlaylist(0).id);
         });
      })
  }
  
  getVolume() {
    return this.angularPlayer.getVolume();
  }
  
  setVolume(value){
    this.angularPlayer.adjustVolumeSlider(value);
  }
}

PlayerService.$inject = ['angularPlayer','AlbumService']

export default PlayerService