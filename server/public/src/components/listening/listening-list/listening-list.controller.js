import VirtualRepeaterList from 'common/virtual-repeater-list'
import BaseNavController from 'common/base-nav.controller'

class ListeningListController extends BaseNavController {
    constructor($msPlayer, $window, $msMessage, $mdMedia) { "ngInject";
        super()
        this.$msPlayer = $msPlayer
        this.$window = $window
        this.$msMessage = $msMessage
        this.$mdMedia = $mdMedia 

        this.tracks = null
        this.currentTrack = null
        this.indexCurrentTrack = null
    }

    $onInit() {
      super.registerNavigation()
       // Initialize repeater list
        this.tracks = new VirtualRepeaterList(
            50,
            this.$msPlayer.getPlaylistCount(),
            this.$msPlayer)
      
    }
  	
  	playSong(id){
  	  this.$msPlayer.playTrack(id)
  	}

    $doCheck(){
      if ( (this.parent.getPlayingTrack() && this.currentTrack 
           && (this.parent.getPlayingTrack().id != this.currentTrack.id)) ||
           ( this.parent.getPlayingTrack() && this.currentTrack == null ) ||
           ( this.parent.getPlayingTrack() == undefined && this.currentTrack)){
           // Set currentTrack when change playing track
           this.currentTrack = this.parent.getPlayingTrack()
           
           // Set index positon of playing track, only when loading first time
           if(this.currentTrack && this.indexCurrentTrack == null && this.tracks){
             this.indexCurrentTrack = this.$msPlayer.getIndexById(this.currentTrack.id)-1
           }
      }
      
    }
    
  doSomething(){
    this.$msMessage.showMessage("Coming Soon!!")
  }
}

export default ListeningListController
