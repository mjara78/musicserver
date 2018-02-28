import PlayerControlsController from './player-controls/player-controls.controller'

class PlayerController {  
  constructor($msPlayer, $msSong, $mdBottomSheet, $timeout) { "ngInject";
    this.$msPlayer = $msPlayer
    this.$msSong = $msSong
    this.$mdBottomSheet = $mdBottomSheet
    this.$timeout = $timeout
   
    this.showPlayerControls = false
    this.volume = this.$msPlayer.getVolume()
    this.progress = this.$msPlayer.getProgress()
    this.isActive = this.$msPlayer.getActive()
    this.isPlaying = this.$msPlayer.getPlaying()
    this.loaded = this.$msPlayer.getLoadedProgress()
    this.currentPlaying = null //this.$msPlayer.getCurrentTrackData()
    this.currentPosition = 0
    this.currentDuration = 0

    // subscribe progress changes
    this.subscriptionProgress = $msPlayer.subscribe('trackProgress', (function(newValue) {
      this.$timeout( () => {
        this.progress = newValue
      })
    }).bind(this))

    // subscribe active changes
    this.subscriptionActive = $msPlayer.subscribe('isActive', (function(newValue) {
      this.$timeout( () => {
        this.isActive = newValue
      })
    }).bind(this))

    // subscribe isPlaying changes
    this.subscriptionPlaying = $msPlayer.subscribe('isPlaying', (function(newValue) {
      this.$timeout( () => {
        this.isPlaying = newValue
      })
    }).bind(this))

    // subscribe loaded changes
    this.subscriptionLoaded = $msPlayer.subscribe('loadedProgress', (function(newValue) {
      this.$timeout( () => {
        this.loaded = newValue
      })
    }).bind(this))

    // subscribe currentTrackData changes
    this.subscriptionCurrentTD = $msPlayer.subscribe('currentTrackData', (function(newValue) {
      this.$timeout( () => {
        var prevValue = this.currentPlaying 
        this.currentPlaying = newValue

        if (prevValue) {
            if (prevValue.id != newValue.id) { // when track change
              this.parent.handlePlayingTrack({ currentSong: this.currentPlaying});

              // hide and show advanced player controls when track change
              if (this.showPlayerControls){
                    this.$mdBottomSheet.hide({ showAgain: true })
                    this.showPlayerCtrls()
              }
            }
        }

        
      })
    }).bind(this))

    // subscribe position changes
    this.subscriptionPosition = $msPlayer.subscribe('position', (function(newValue) {
      this.$timeout( () => {
        this.currentPosition = this.$msPlayer.getHumanTime(newValue)
      })
    }).bind(this))

    // subscribe duration changes
    this.subscriptionDuration = $msPlayer.subscribe('duration', (function(newValue) {
      this.$timeout( () => {
        this.currentDuration = this.$msPlayer.getHumanTime(newValue)
      })
    }).bind(this))
  }

  /*************************** 
     Life cicle Hooks BEGIN
  ****************************/
  $onInit(){
    
  }
  
  $doCheck(){
    
  }

  $onDestroy() {
      this.subscriptionProgress.dispose()
      this.subscriptionActive.dispose()
      this.subscriptionPlaying.dispose()
      this.subscriptionLoaded.dispose()
      this.subscriptionCurrentTD.dispose()
      this.subscriptionDuration.dispose()
      this.subscriptionPosition.dispose()
  }

  /************************ 
     Life cicle Hooks END 
  *************************/

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

  nextTrack(){
    this.$msPlayer.nextTrack()
  }

  prevTrack(){
    this.$msPlayer.prevTrack()
  }
  
  showPlayerCtrls(){
    this.showPlayerControls = true

    this.$mdBottomSheet.show({
      templateUrl: './src/common/player/player-controls/player-controls.html',
      controller: PlayerControlsController,
      locals: { current: this.currentPlaying, 
                isPlaying: this.isPlaying
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
    })
    .catch( () => {
      this.showPlayerControls = false
    });
  }

  play(){
    this.$msPlayer.play()
  }

  pause(){
    this.$msPlayer.pause()
  }
}

export default PlayerController