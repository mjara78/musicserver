class RecentsListController {
    constructor() {}

    $onInit() {
        this.onViewLoaded({
            $event: {
                view: this.$transition$.to().name
            }
        });

    }

}

export default RecentsListController