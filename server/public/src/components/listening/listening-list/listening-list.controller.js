import VirtualRepeaterList from 'common/virtual-repeater-list'
import BaseNavController from 'common/base-nav.controller'

class ListeningListController extends BaseNavController {
    constructor($msPlayer, $window) { "ngInject";
        super()
        this.$msPlayer = $msPlayer
        this.$window = $window

        this.tracks = null
        this.currentTrack = null
    }

    $onInit() {
      super.registerNavigation()
       // Initialize repeater list
        this.tracks = new VirtualRepeaterList(
            50,
            this.$msPlayer.getPlaylistCount(),
            this.$msPlayer)

    }

    // Workaround for vinrtual-repeat height: https://github.com/angular/material/issues/4314
    getListHeight() {
        return { height: '' + (this.$window.innerHeight - 91 /* player */ - 64 /* header */ - 53 /* card-title */ - 52 /* table-header */ - 33 /* padding */ ) + 'px' };
    }
  	
  	playSong(id){
  	  this.$msPlayer.playTrack(id)
  	}

    $doCheck(){
      if ( (this.parent.getPlayingTrack() && this.currentTrack 
           && (this.parent.getPlayingTrack().id != this.currentTrack.id)) ||
           ( this.parent.getPlayingTrack() && this.currentTrack == null ) ||
           ( this.parent.getPlayingTrack() == undefined && this.currentTrack)){
   
           this.currentTrack = this.parent.getPlayingTrack()
      }
      
    }
}

export default ListeningListController
