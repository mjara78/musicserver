import PlayerControlsController from './player-controls/player-controls.controller'

class PlayerController {  
  constructor($msPlayer, $scope, $msSong, $mdBottomSheet) { "ngInject";
    this.$msPlayer = $msPlayer
    this.$scope = $scope
    this.$msSong = $msSong
    this.$mdBottomSheet = $mdBottomSheet
    
    this.currentSong = null
    this.showPlayerControls = false
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
       
       // hide and show advanced player controls again
       if (this.showPlayerControls){
         this.$mdBottomSheet.hide({ showAgain: true })
         this.showPlayerCtrls()
       }
    }
  }

  nextTrack(){
    this.$msPlayer.nextTrack()
  }

  prevTrack(){
    this.$msPlayer.prevTrack()
  }
  
  showPlayerCtrls(){
    this.showPlayerControls = true
    console.log("showPlayerControls(show): " + this.showPlayerControls )
    this.$mdBottomSheet.show({
      templateUrl: './src/common/player/player-controls/player-controls.html',
      controller: PlayerControlsController,
      locals: { current: this.currentSong, 
                isPlaying: this.$scope.isPlaying
              },
      bindToController: true,
      controllerAs: '$ctrl'
    })
    .then( (result) => {
      if (result.showAgain){
        this.showPlayerControls = true  
      } else {
        this.showPlayerControls = false
      }
      console.log("showPlayerControls(then): " + this.showPlayerControls )
    })
    .catch( () => {
      this.showPlayerControls = false
      console.log("showPlayerControls(catch): " + this.showPlayerControls )
    });
  }
}

export default PlayerController