class AlbumHeaderController {  
  constructor($window) { "ngInject";
    this.$window = $window
  }

  back() {
    this.$window.history.back()
  }
}

export default AlbumHeaderController