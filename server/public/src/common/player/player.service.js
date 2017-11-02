class PlayerService {  
  constructor (angularPlayer, $msAlbum) { "ngInject";
    this.angularPlayer = angularPlayer;
    this.$msAlbum = $msAlbum;
  }

  setPosition(pos){
    this.angularPlayer.setPosition(pos);
  }
	
  getDuration(){
    return this.angularPlayer.getDuration();
  }
  
  playAlbum(id){
    this.$msAlbum.getAlbumSongs(id)
      .then( songs => {
         // Clear playlist
         
         this.angularPlayer.clearPlaylist( data => {
         
           //Populate new playlist
           for (let song of songs){
             let track = {
               url : 'api/songs/' + song.id + '/stream',
               id : '#'+song.id,
               title : song.title,
               track : song.track,
               album : song.Album.name,
               artist : song.Artist.name,
               imageUrlSmall : song.Album.imageUrlSmall,
               imageUrlLarge : song.Album.imageUrlLarge
             };
           
             // Add to playlist
             this.angularPlayer.addTrack(track);
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

export default PlayerService