class MusicNavController {
    constructor() {
        this.filterText;
    }

    $onInit() {
        this.onViewLoaded({
            $event: {
                view: this.$transition$.to().name
            }
        });
    }
    
    selectNavItem($event){
       this.currentNavItem = $event.selected
    }
    

}

//MusicNavController.$inject = ['$scope']

export default MusicNavController