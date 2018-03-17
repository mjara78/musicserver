class PlayerService {
  constructor ($sm2Player, $msAlbum, $q, $msCommon) { "ngInject";
    this.$sm2Player = $sm2Player;
    this.$msAlbum = $msAlbum;
    this.$q = $q
    this.$msCommon = $msCommon

    // Init soundmanager2 player
    this.$sm2Player.init()
  }

  setPosition(pos){
    this.$sm2Player.setPosition(pos);
  }

  getDuration(){
    return this.$sm2Player.getDuration();
  }

  playAlbum(id){
    this.$msAlbum.getAlbumSongs(id)
      .then( songs => {
         // Clear playlist
         this.$sm2Player.clearPlaylist( data => {
           this.populatePlaylist(songs)

           // Play first track of new playlist
           this.playTrack(this.$sm2Player.getPlaylist(0).id)
         })
      })
  }

  addAlbumToPlaylist(id){
    this.$msAlbum.getAlbumSongs(id)
      .then( songs => {
           this.populatePlaylist(songs)
      })
  }

  populatePlaylist(songs){
    //Add songs to the new playlist
    for (let song of songs){

       let track = {
         url: 'api/songs/' + song.id + '/stream',
         id: '#'+song.id,
         idSong: song.id,
         title: song.title,
         track: song.track,
         album: song.Album.name,
         idAlbum: song.Album.id,
         artist: song.Artist.name,
         idArtist: song.Artist.id,
         imageUrlSmall: song.Album.imageUrlSmall,
         imageUrlLarge: song.Album.imageUrlLarge,
         duration: this.$msCommon.getHumanTime(song.duration),
         like: this.getSongUserInfo(song.SongUsers, 'like'),
         dislike: this.getSongUserInfo(song.SongUsers, 'dislike')
       };

       // Add to playlist
       this.$sm2Player.addTrack(track);
    }
  }

  playSongsFrom(id, songs){
    // Clear playlist
     this.$sm2Player.clearPlaylist( data => {
       this.populatePlaylist(songs)

       // Play track id of new playlist
       this.playTrack("#"+id)
     })
  }

  getVolume() {
    return this.$sm2Player.getVolume();
  }

  setVolume(value){
    this.$sm2Player.adjustVolumeSlider(value);
  }

  getPlaylist(){
    return this.$sm2Player.getPlaylist()
  }

  getPlaylistCount(){
    return this.getPlaylist().length
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
    this.$sm2Player.playTrack(id)
  }
 
  getHumanTime(time) {
      function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
      }

      var min = (time / 60) << 0,
           sec = Math.round( time % 60);

      return pad(min) + ':' + pad(sec)
  }
  
  getIndexById(id){
    return this.$sm2Player.isInArray(this.getPlaylist(),id)
  }
  
  getSongUserInfo(info, type){
    if(info.length > 0){
      if (info[0][type] ===  null) {
        return false
      } else {
        return info[0][type]
      } 
    } else {
      return false
    }
  }

  nextTrack(){
    if( this.$sm2Player.isLastTrack() && this.getPlaying() ){
      return false
    }
    this.$sm2Player.nextTrack()
  }

  prevTrack(){
    this.$sm2Player.prevTrack()
  }
  
  play(){
    this.$sm2Player.play()
  }
  
  pause(){
    this.$sm2Player.pause()
  }

  getProgress(){
    return this.$sm2Player.getProgress()
  }

  getPlaying(){
    return this.$sm2Player.getPlaying()
  } 

  getActive(){
    return this.$sm2Player.getActive()
  }

  getLoadedProgress(){
    return this.$sm2Player.getLoadedProgress()
  }

  getCurrentTrackData(){
    return this.$sm2Player.getCurrentTrackData()
  }

  subscribe(subject, callback){
    this.$sm2Player.subjects[subject].subscribe(callback)
  }


}

export default PlayerService
