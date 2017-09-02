import VirtualRepeaterList from '../virtual-repeater-list'
import angular from 'angular'

class ArtistListController {
    constructor(artistService, mdMedia, window, state) {
        this.artistService = artistService
        this.mdMedia = mdMedia
        this.window = window
        this.state = state

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
        // Select correct tab
        this.onTabPageLoaded({
          $event: {
            selected : "artists"
          }
        })

        // Load repeter component
        var paramFilter = {
            name: this.filter
        }
        this.artistService.getCountArtists(paramFilter)
            .then(numItems => {
                this.artists = new VirtualRepeaterList(this.columns,
                    this.pageSize,
                    numItems,
                    this.artistService,
                    paramFilter)
            })
    }

    $onChanges(changesObj) {
        if (changesObj.filter) {
            if (changesObj.filter.currentValue != changesObj.filter.previousValue) {

                var value = changesObj.filter.currentValue

                if (this.artists) {
                    var paramFilter = {
                        name: value
                    }
                    if (value) {
                        if (value.length >= 3) {
                            this.artistService.getCountArtists(paramFilter)
                                .then(numItems => {
                                    this.artists.numItems = numItems
                                    this.artists.loadedData = {}
                                    this.artists.filter.name = value
                                })
                        }
                    } else {
                        this.artistService.getCountArtists(paramFilter)
                            .then(numItems => {
                                this.artists.numItems = numItems
                                this.artists.loadedData = {}
                                this.artists.filter.name = value
                            })
                    }

                }

            }
        }
    }

    // Workaround for vinrtual-repeat height: https://github.com/angular/material/issues/4314
    getListHeight() {
        return { height: '' + (this.window.innerHeight - 116 /* player */ - 64 /* header */ - 48 /* nav-bar */ - 20 /* padding */ ) + 'px' };
    };
}

ArtistListController.$inject = ['ArtistService', '$mdMedia', '$window', '$state']

export default ArtistListController