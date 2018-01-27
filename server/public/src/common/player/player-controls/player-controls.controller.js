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

  go(option){
    this.$mdBottomSheet.hide({ showAgain: false })
    this.$state.go(option)
  }
}

export default PlayerControlsController