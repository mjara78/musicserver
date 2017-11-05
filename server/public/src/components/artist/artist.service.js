import GenericResourceService from 'common/services/generic-resource.service'

class ArtistService extends GenericResourceService {
    constructor(Restangular) { "ngInject";
        super(Restangular)

        this.resource = 'artists'
    }

    fetchPage(offset, limit, filter) {
        var options = {}
        options.order = 'name';
        options.offset = offset;
        options.limit = limit;
     
        if (filter.name) {
          options.name = filter.name;
        }
                   
        return this.getAll(options)
    }
}

export default ArtistService