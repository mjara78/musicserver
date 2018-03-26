import BaseNavController from 'common/base-nav.controller'

class AlbumDetailController extends BaseNavController {  
  constructor($timeout, $msAlbum, $msPlayer, $mdMedia, $msCommon) { "ngInject";
    super()
 
  	this.$timeout = $timeout
  	this.$msAlbum = $msAlbum
  	this.$msPlayer = $msPlayer
  	this.$mdMedia = $mdMedia
  	this.$msCommon = $msCommon

  	this.selectedAll = false
  	this.selected = null
  	this.checkboxAll = false
  	this.duration = "00:00"

  	this.songs = null;
  }

	$onInit() {
		// Initialize header
  		this._setStandarHeader()		

		this.$msAlbum.getAlbumSongs(this.album.id)
			.then( results => {
				this.songs = results
					
					// calculate album duration
				var seconds = 0
				for( let song of this.songs){
				  seconds += song.duration
				}
				this.duration = this.$msCommon.getHumanTime(seconds)
			})
			
	}
    
    $onChanges(changes){
    	if (this.cancelSelected){
    		this.selectedAll = false
    		this.selected = []
    		this.checkboxAll = false
    		this.testSelected()	
    	}
    }

	toggleCheckboxs(){
		if (this.selectedAll){
			this.selected = []
			this.selectedAll = false
		} else {
			this.selected = this.songs.map(function(item) { return item.id })	
			this.selectedAll = true
		}

		this.testSelected()		
	}

	testSelected(){
		this.$timeout(() => {
        	if(this.selected.length > 0){
				this._setSelectionHeader()
			}
			else{
				this._setStandarHeader()
			}
        });
	}

	playAlbumFrom(id){
		this.$msPlayer.playSongsFrom(id, this.songs)
	}
	
	playShuffle(){
	  var shuffleSongs = []
	  
	  angular.copy(this.songs, shuffleSongs)
	  // sort array copied random
	  this.$msCommon.shuffle(shuffleSongs)
	  
	  // play it
	  this.$msPlayer.playSongsFrom(shuffleSongs[0].id, shuffleSongs)
	}
	
	_setStandarHeader(){
	  super.updateHeader({ 
		   customHeader: 'album-header',
		   customData: this.album
		 })
	}
	
	_setSelectionHeader(){
	  super.updateHeader({ 
		   customHeader: 'album-header-select',
		   customData: this.selected
		 })

	  this.parent.updateSelected({
	      cancelSelected: false
	    })
	}
}

export default AlbumDetailController