class PlayerControlsController {  
  constructor($msPlayer, $state, $mdBottomSheet) { "ngInject";
  	this.$msPlayer = $msPlayer
    this.$state = $state
    this.$mdBottomSheet = $mdBottomSheet 
  }
  
  play(){
    this.$msPlayer.play()
    this.isPlaying = true
  }
  
  pause(){
    this.$msPlayer.pause()
    this.isPlaying = false
  }

  go(option, param){
    this.$mdBottomSheet.hide({ showAgain: false })
    this.$state.go(option, param)
  }
  
  nextTrack(){
    this.$msPlayer.nextTrack()
  }

  prevTrack(){
    this.$msPlayer.prevTrack()
  }
}

export default PlayerControlsController