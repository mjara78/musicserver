class MusicNavController {
    constructor(scope) {
        this.scope = scope;

        this.scope.currentNavItem = 'artists';
    }

    $onInit() {
        this.onViewLoaded({
            $event: {
                view: this.$transition$.to().name
            }
        });
    }

}

MusicNavController.$inject = ['$scope']

export default MusicNavController