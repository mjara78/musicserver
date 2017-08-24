import VirtualRepeaterList from '../virtual-repeater-list'

class ArtistListController {
    constructor(artistService, mdMedia, window) {
        this.artistService = artistService
        this.mdMedia = mdMedia
        this.window = window

        this.artists = null

        if (this.mdMedia('md')) {
            this.columns = 4
            this.pageSize = 52
        } else if (this.mdMedia('gt-md')) {
            this.columns = 6
            this.pageSize = 54
        } else if (this.mdMedia('sm')) {
            this.columns = 3
            this.pageSize = 51
        } else if (this.mdMedia('xs')) {
            this.columns = 2
            this.pageSize = 50
        }
    }

    $onInit() {
        this.artistService.getCountArtists()
            .then(numItems => {
                this.artists = new VirtualRepeaterList(this.columns,
                    this.pageSize,
                    numItems,
                    this.artistService)
            })

    }

    // Workaround for vinrtual-repeat height: https://github.com/angular/material/issues/4314
    getListHeight() {
        return { height: '' + (this.window.innerHeight - 116 /* player */ - 64 /* header */ - 48 /* nav-bar */ - 20 /* padding */ ) + 'px' };
    };
}

ArtistListController.$inject = ['ArtistService', '$mdMedia', '$window']

export default ArtistListController