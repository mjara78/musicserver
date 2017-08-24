class ArtistService {
    constructor(rest) {
        this.rest = rest;

        this.options = {};
    }

    fetchPage(offset, limit) {
        this.options.order = 'name';
        this.options.offset = offset;
        this.options.limit = limit;

        return this.rest.all('artists')
            .getList(this.options)
            .then(response => response)
    }

    getCountArtists() {
        return this.rest.one('artists')
            .customGET("count")
            .then(response => response)
    }
}

ArtistService.$inject = ['Restangular']

export default ArtistService