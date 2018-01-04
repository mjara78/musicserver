class PlayerService {
  constructor (angularPlayer, $msAlbum, $q) { "ngInject";
    this.angularPlayer = angularPlayer;
    this.$msAlbum = $msAlbum;
    this.$q = $q

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
               url: 'api/songs/' + song.id + '/stream',
               id: '#'+song.id,
               title: song.title,
               track: song.track,
               album: song.Album.name,
               artist: song.Artist.name,
               imageUrlSmall: song.Album.imageUrlSmall,
               imageUrlLarge: song.Album.imageUrlLarge,
               duration: this.getHumanTime(song.duration)
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

  getPlaylist(){
    return this.angularPlayer.getPlaylist()
  }

  getPlaylistCount(){
    return this.angularPlayer.getPlaylist().length
  }

  fetchPage(offset, limit) {
      var defered = this.$q.defer();
      var promise = defered.promise;

      // Return array page in a promise
      defered.resolve(this.getPlaylist().slice(offset, offset+limit))
      
      return promise
  }
  
  // Play track from playlist by track id
  playTrack(id){
    this.angularPlayer.playTrack(id)
  }
 
  getHumanTime(time) {
      function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
      }

      var min = (time / 60) << 0,
           sec = Math.round( time % 60);

      return pad(min) + ':' + pad(sec)
  }
  
  addAlbumToPlaylist(id){
    this.$msAlbum.getAlbumSongs(id)
      .then( songs => {
           //Add songs to the new playlist
           for (let song of songs){
             let track = {
               url: 'api/songs/' + song.id + '/stream',
               id: '#'+song.id,
               title: song.title,
               track: song.track,
               album: song.Album.name,
               artist: song.Artist.name,
               imageUrlSmall: song.Album.imageUrlSmall,
               imageUrlLarge: song.Album.imageUrlLarge,
               duration: this.getHumanTime(song.duration)
             };

             // Add to playlist
             this.angularPlayer.addTrack(track);
           }
         })
  }
}

export default PlayerService
