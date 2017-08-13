import angular from 'angular'

import { ArtistListItemComponent } from './artist-list-item/artist-list-item.component'
import ArtistService from './artist.service'

const artist = angular
    .module('artist', [])
    .service('ArtistService', ArtistService)
    .component('msArtistListItem', ArtistListItemComponent)
    .name

export default artist