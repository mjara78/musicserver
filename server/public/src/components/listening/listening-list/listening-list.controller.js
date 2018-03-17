import VirtualRepeaterList from 'common/virtual-repeater-list'
import BaseNavController from 'common/base-nav.controller'

class ListeningListController extends BaseNavController {
    constructor($msPlayer, $window, $msMessage, $mdMedia, $state) { "ngInject";
        super()
        this.$msPlayer = $msPlayer
        this.$window = $window
        this.$msMessage = $msMessage
        this.$mdMedia = $mdMedia 
        this.$state = $state

        this.tracks = null
        this.indexCurrentTrack = null
    }

    $onInit() {
      super.updateHeader()
       // Initialize repeater list
        this.tracks = new VirtualRepeaterList(
            50,
            this.$msPlayer.getPlaylistCount(),
            this.$msPlayer)
    
    }
  	
  	playSong(id){
  	  this.$msPlayer.playTrack(id)
  	}

  $onChanges(changes){
    this._updateIndexTrack()
  }
    
  doSomething(){
    this.$msMessage.showMessage("Coming Soon!!")
  }
  
  goAlbum(id){
    this.$state.go('secure.album', { idAlbum: id })
  }

  _updateIndexTrack(){
    // Set index positon of playing track, only when loading first time
    if(this.currentTrack && this.indexCurrentTrack == null){
       this.indexCurrentTrack = this.$msPlayer.getIndexById(this.currentTrack.id)-1
    } 
  }
}

export default ListeningListController
