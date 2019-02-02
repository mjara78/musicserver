import GenericResourceService from 'common/services/generic-resource.service'

class ArtistService extends GenericResourceService {
    constructor(Restangular) { "ngInject";
        super(Restangular)

        this.resource = 'artists'
    }

    fetchPage(offset, limit, filter) {
        var options = {}
        options.order = 'artistName';
        options.offset = offset;
        options.limit = limit;
     
        if (filter.name) {
          options.artistName = filter.name;
          options.regexp = true;
        }
                   
        return this.getAll(options)
    }

    getCount(filter) {
        var options = {}
        if (filter.name) {
          options.artistName = filter.name
        } else {
          options.artistName = null
        }
    
        return this.getCountAll(this.options);
      }
}

export default ArtistService