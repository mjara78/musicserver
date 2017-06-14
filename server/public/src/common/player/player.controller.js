class PlayerController {  
  constructor(PlayerService) {
    this.playerService = PlayerService;
//    this.buffering = 100;
 //   this.scope = scope;
    
    this.songs = [
            {
                id: '#1',
                title: 'uno',
                artist: 'Michael Giatchino',
                url: 'listen/250'
            },
            {
                id: '#2',
                title: 'dos',
                artist: 'Michael Giatchino',
                url: 'listen/80'
            },
            {
                id: '#3',
                title: 'tres',
                artist: 'Michael Giatchino',
                url: 'listen/125'
            },
            {
                id: '#4',
                title: 'cuatro',
                artist: 'Michael Giatchino',
                url: 'listen/322'
            },
            {
                id: '#5',
                title: 'cinco',
                artist: 'Michael Giatchino',
                url: 'listen/222'
            }
        ];
        
     
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
}

PlayerController.$inject = ['PlayerService'];

export default PlayerController