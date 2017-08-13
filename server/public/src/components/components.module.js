import angular from 'angular'

import home from './home/home.module'
import settings from './settings/settings.module'
import album from './album/album.module'
import music from './music/music.module'
import artist from './artist/artist.module'

const components = angular
    .module('app.components', [album, artist, home, music, settings])
    .name

export default components