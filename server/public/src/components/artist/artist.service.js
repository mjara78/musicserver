class ArtistService {
    constructor(rest) {
        this.rest = rest;

        this.options = {};

        //this.options.offset = offset;
        //this.options.limit = limit;
    }

    getArtists() {
        this.options.order = 'name';

        return this.rest.all('artists')
            .getList(this.options)
            .then(response => response)
    }
}

ArtistService.$inject = ['Restangular']

export default ArtistService