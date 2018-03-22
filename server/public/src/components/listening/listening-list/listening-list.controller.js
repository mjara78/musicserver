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
        this.topIndex = null
        
        this.tableHeight = null
        this.rowHeight = null
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
    this._getElementsHeight()
  
    var visibleElems = Math.floor(this.tableHeight/this.rowHeight)
    var indexCurrent = this.$msPlayer.getIndexById(this.currentTrack.id)
  
    // Set index positon of playing track, only when loading first time
    if(this.currentTrack){
      if ( this.topIndex == null ){ // First time access to page
        this.topIndex = indexCurrent - 1
      } else { // Top index not null. Allready in page
         if (this.topIndex < indexCurrent){
           if(indexCurrent-this.topIndex >= visibleElems) { // Current not visible
             this.topIndex = indexCurrent - visibleElems + 1 // scroll to topindex for make visible
           }
         } else { // top index greater than current index
           if( this.topIndex - indexCurrent >= visibleElems) { // Current not visible
             this.topIndex = indexCurrent - 1
           }
         }
        
      }
      
    } 
  }
  
  _getElementsHeight(){
    var tableElement = angular.element(document.querySelector('#ms-table-body'))
    var rowElement = angular.element(document.querySelector('#ms-table-row')) 
    
    this.tableHeight = tableElement[0].offsetHeight
    this.rowHeight = rowElement[0].offsetHeight
  }
}

export default ListeningListController
