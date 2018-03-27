import BaseNavController from 'common/base-nav.controller'

class RecentsListController extends BaseNavController {
    constructor($msSong, $msPlayer) { "ngInject";
       super()

        this.$msSong = $msSong
    	this.$msPlayer = $msPlayer

    	// Default true for hide loader spinner
    	this.songsLoaded = true
    }

    $onInit() {
        super.updateHeader()
    }

    playRandomAll() {
    	// Show loader spinner
    	this.songsLoaded = false

    	// Get songs and play
    	this.$msSong.getAll({ limit:'200', order: 'random'})
    		.then( songs => {
    			// Add to playlist and play first
    			this.$msPlayer.playSongsFrom(songs[0].id, songs)
    			   .then( () => {
    			      // Hide loader spinner
    	       		this.songsLoaded = true
    			   })

    			
    		})
  	}

}

export default RecentsListController