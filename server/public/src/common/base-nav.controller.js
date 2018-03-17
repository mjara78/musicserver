class BaseNavController {
    constructor() {
    }

    updateHeader(options) {
      var custom = null
      var data = null
      
      if (options){
        if(options.customHeader){
          custom = options.customHeader
          data = options.customData
        }
      } 
        
      this.parent.handleViewLoaded( {
              view: this.$transition$.to().name,
              customHeader: custom,
              customData: data
            });  
    }

}

export default BaseNavController