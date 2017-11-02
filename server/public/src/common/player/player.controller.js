class PlayerController {  
  constructor($msPlayer) { "ngInject";
    this.$msPlayer = $msPlayer

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
}

export default PlayerController