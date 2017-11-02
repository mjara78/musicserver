class ArtistService {
    constructor(Restangular) { "ngInject";
        this.Restangular = Restangular

        this.options = {};
    }

    fetchPage(offset, limit, filter) {
        this.options.order = 'name';
        this.options.offset = offset;
        this.options.limit = limit;

        if (filter.name) {
            this.options.name = filter.name;
        } else {
            this.options.name = null
        }

        return this.Restangular.all('artists')
            .getList(this.options)
            .then(response => response)
    }

    getCountArtists(filter) {
        if (filter.name) {
            this.options.name = filter.name
            
            return this.Restangular.one('artists')
                .customGET("count", this.options)
                .then(response => response)
        } else {
           
            return this.Restangular.one('artists')
                .customGET("count")
                .then(response => response)
        }

    }
}

export default ArtistService