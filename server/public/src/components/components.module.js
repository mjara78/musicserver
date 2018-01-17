import angular from 'angular'

import home from './home/home.module'
import settings from './settings/settings.module'
import album from './album/album.module'
import music from './music/music.module'
import artist from './artist/artist.module'
import login from './login/login.module'
import accounts from  './accounts/accounts.module'
import listening from './listening/listening.module'
import song from './song/song.module'

const components = angular
    .module('app.components', [album, artist, home, music, settings, login, accounts, listening, song])
    .name

export default components
