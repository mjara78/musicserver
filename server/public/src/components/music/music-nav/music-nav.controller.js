import BaseNavController from 'common/base-nav.controller'


class MusicNavController extends BaseNavController {
    constructor() {
        super()
        this.filterText;
    }
    
    selectNavItem($event){
       this.currentNavItem = $event.selected
    }
    
    $onInit() {
      super.registerNavigation()
    }

}

//MusicNavController.$inject = ['$scope']

export default MusicNavController