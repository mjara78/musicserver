import BaseNavController from 'common/base-nav.controller'

class RecentsListController extends BaseNavController {
    constructor() {
      super()
    }

    $onInit() {
        super.registerNavigation()
    }

}

export default RecentsListController