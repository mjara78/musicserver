class BaseNavController {
    constructor() {
    }

    registerNavigation() {
        this.parent.handleViewLoaded(this.$transition$.to().name);
    }

}

export default BaseNavController