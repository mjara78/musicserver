import GenericResourceService from 'common/services/generic-resource.service'

class UserService extends GenericResourceService {
    constructor(Restangular) { "ngInject";
        super(Restangular)

        this.resource = 'users'
    }
}

export default UserService