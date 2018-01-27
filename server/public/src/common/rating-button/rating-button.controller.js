class RatingButtonController {  
  constructor($msPlayer, $msMessage, $msSong ) { "ngInject";
     this.$msPlayer = $msPlayer
     this.$msMessage = $msMessage
     this.$msSong = $msSong 
  }

  toggleRating(){
    var userInfo = {}

    // Set rating value inverting actual value
    if (this.ratingType == 'like') {
      this.song.like = (!this.song.like)
      this.song.dislike = false  
    } else {
      this.song.dislike = (!this.song.dislike)
      this.song.like = false  
    } 
    userInfo.like = this.song.like
    userInfo.dislike = this.song.dislike

    // Update rating
    this.$msSong.updateUserInfo(userInfo, this.song.idSong)
      .then( result => {
        // Callback function
        this.onRatingChange()
      })
  }
  
  // Get color for rating button depends of your state
  getStateColor(){
    if (this.song){
      if (this.song[this.ratingType]) {
        return 'primary-500' // Activated 
      } else {
        return 'grey-300' // Deactivated
      }  
    } else {
      return 'grey-300' // Deactivated
    }
    
  }
}

export default RatingButtonController