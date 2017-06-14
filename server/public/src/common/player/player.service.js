class PlayerService {  
  constructor (angularPlayer) {
    this.angularPlayer = angularPlayer;
    
  }

  setPosition(pos){
    this.angularPlayer.setPosition(pos);
  }
	
  getDuration(){
    return this.angularPlayer.getDuration();
  }
}

PlayerService.$inject = ['angularPlayer']

export default PlayerService