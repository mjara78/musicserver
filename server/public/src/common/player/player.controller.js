class PlayerController {  
  constructor($msPlayer, $scope) { "ngInject";
    this.$msPlayer = $msPlayer
    this.$scope = $scope
    
    this.currentSong = null
    this.volume = this.$msPlayer.getVolume()
  }

  setCurrentTime($event){
    var posX = $event.x;
    var progress = document.getElementById('progress');
    var dur = this.$msPlayer.getDuration();
    var rect = progress.getBoundingClientRect();
    
    this.$msPlayer.setPosition( ((posX-rect.left)/rect.width)*dur );
  }
  
  changeVolume(){
    this.$msPlayer.setVolume(this.volume);
  }
  
  $doCheck(){
    if ( (this.$scope.currentPlaying && this.currentSong 
         && (this.$scope.currentPlaying.id != this.currentSong.id)) ||
         ( this.$scope.currentPlaying && this.currentSong == null ) ||
         ( this.$scope.currentPlaying == undefined && this.currentSong)){
 
         this.currentSong = this.$scope.currentPlaying

       this.parent.handlePlayingTrack({ currentSong: this.currentSong});
    }
  
  }
}

export default PlayerController