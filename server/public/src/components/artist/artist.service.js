class ArtistService {
    constructor(rest) {
        this.rest = rest;

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

        return this.rest.all('artists')
            .getList(this.options)
            .then(response => response)
    }

    getCountArtists(filter) {
        if (filter.name) {
            this.options.name = filter.name
            
            return this.rest.one('artists')
                .customGET("count", this.options)
                .then(response => response)
        } else {
           
            return this.rest.one('artists')
                .customGET("count")
                .then(response => response)
        }

    }
}

ArtistService.$inject = ['Restangular']

export default ArtistService