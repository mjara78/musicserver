import VirtualRepeaterColunmList from '../virtual-repeater-column-list'

class AlbumListController {
    constructor($msAlbum, $mdMedia, $window) { "ngInject";
        this.$msAlbum = $msAlbum
        this.$mdMedia = $mdMedia
        this.$window = $window

        this.albums = null

        if (this.$mdMedia('md')) {
            this.columns = 4
            this.pageSize = 52
        } else if (this.$mdMedia('gt-md')) {
            this.columns = 6
            this.pageSize = 54
        } else if (this.$mdMedia('sm')) {
            this.columns = 3
            this.pageSize = 51
        } else if (this.$mdMedia('xs')) {
            this.columns = 2
            this.pageSize = 50
        }
    }

    $onInit() {
       // Select correct tab
        this.onTabPageLoaded({
          $event: {
            selected : "albums"
          }
        });

        // Load repeter component
        var paramFilter = {
            name: this.filter
        }

        this.$msAlbum.getCount(paramFilter)
            .then(numItems => {
                this.albums = new VirtualRepeaterColunmList(this.columns,
                    this.pageSize,
                    numItems,
                    this.$msAlbum,
                    paramFilter)
            })
    }

    $onChanges(changesObj) {
        if (changesObj.filter) {
            if (changesObj.filter.currentValue != changesObj.filter.previousValue) {

                var value = changesObj.filter.currentValue

                if (this.albums) {
                    var paramFilter = {
                        name: value
                    }
                    if (value) {
                        if (value.length >= 3) {
                            this.$msAlbum.getCount(paramFilter)
                                .then(numItems => {
                                    this.albums.numItems = numItems
                                    this.albums.loadedData = {}
                                    this.albums.filter.name = value
                                })
                        }
                    } else {
                        this.$msAlbum.getCount(paramFilter)
                            .then(numItems => {
                                this.albums.numItems = numItems
                                this.albums.loadedData = {}
                                this.albums.filter.name = value
                            })
                    }

                }

            }
        }
    }


    // Workaround for vinrtual-repeat height: https://github.com/angular/material/issues/4314
    getListHeight() {
        return { height: '' + (this.$window.innerHeight - 91 /* player */ - 64 /* header */ - 48 /* nav-bar */ - 20 /* padding */ ) + 'px' };
    };
}

export default AlbumListController
