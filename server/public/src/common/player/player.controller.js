class PlayerController {  
  constructor(PlayerService) {
    this.playerService = PlayerService;   
    this.volume = this.playerService.getVolume();
  }
  
//  $onInit(){
 //   this.scope.$on('track:loaded', (event, data) => {this.buffering = data} );
//  }
  
  setCurrentTime($event){

    var posX = $event.x;
    var progress = document.getElementById('progress');
    var dur = this.playerService.getDuration();
    var rect = progress.getBoundingClientRect();
    
  //  alert("posx="+posX+",dur="+dur+",rectx="+rect.left+",rectwidth="+rect.width+",seek="+((posX-rect.left)/rect.width)*dur);
   // console.log("posx="+posX+",dur="+dur+",rectx="+rect.left+",rectwidth="+rect.width+",seek="+((posX-rect.left)/rect.width)*dur);  
    this.playerService.setPosition( ((posX-rect.left)/rect.width)*dur );
  }
  
  changeVolume(){
    this.playerService.setVolume(this.volume);
  }
}

PlayerController.$inject = ['PlayerService'];

export default PlayerController