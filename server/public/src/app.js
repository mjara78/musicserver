// /app/app.js
import angular from 'angular'
import uiRouter from '@uirouter/angularjs'
import 'angular-animate'
import 'angular-aria'
import 'angular-material'
import 'restangular'
import 'satellizer'
import 'ngstorage'
import 'checklist-model'

import '/home/osmc/workspace/angular-soundmanager2/dist/angular-soundmanager2'


import common from './common/common.module'
import components from './components/components.module'
import { AppComponent } from './app.component'

const root = angular
    .module('musicserver', [
        uiRouter,
        common,
        components,
        'ngMaterial',
        'restangular',
        'angularSoundManager',
        'satellizer',
        'ngStorage',
        'checklist-model'
    ])
    .config(['$mdIconProvider',
        '$mdThemingProvider',
        'RestangularProvider',
        '$authProvider',
        '$sessionStorageProvider',
        ($mdIconProvider, $mdThemingProvider, RestangularProvider, $authProvider, $sessionStorageProvider) => {
            // Register the icons
            $mdIconProvider
                .icon("menu", "assets/svg/menu.svg", 24)
                .icon("appLogo", "assets/svg/logo.svg", 24)
                .icon("home", "assets/svg/ic_home_black_24px.svg", 24)
                .icon("playlist", "assets/svg/ic_playlist_play_black_24px.svg", 24)
                .icon("listening", "assets/svg/ic_queue_music_black_24px.svg", 24)
                .icon("musicLib", "assets/svg/ic_library_music_black_24px.svg", 24)
                .icon("settings", "assets/svg/ic_settings_black_24px.svg", 24)
                .icon("edit", "assets/svg/ic_mode_edit_black_24px.svg", 24)
                .icon("refresh", "assets/svg/ic_refresh_black_24px.svg", 24)
                .icon("back", "assets/svg/ic_arrow_back_white_24px.svg", 24)
                .icon("more", "assets/svg/ic_more_vert_black_24px.svg", 24)
                .icon("like", "assets/svg/ic_thumb_up_black_24px.svg", 24)
                .icon("dislike", "assets/svg/ic_thumb_down_black_24px.svg", 24)
                .icon("volumeUp", "assets/svg/ic_volume_up_black_24px.svg", 24)
                .icon("volumeDown", "assets/svg/ic_volume_down_black_24px.svg", 24)
                .icon("previous", "assets/svg/ic_skip_previous_black_24px.svg", 48)
                .icon("playFilled", "assets/svg/ic_play_circle_filled_black_48px.svg", 48)
                .icon("pauseFilled", "assets/svg/ic_pause_circle_filled_black_24px.svg", 48)
                .icon("next", "assets/svg/ic_skip_next_black_24px.svg", 48)
                .icon("account", "assets/svg/ic_account_circle_white_24px.svg", 24)
                .icon("search", "assets/svg/ic_search_black_24px.svg", 24)
                .icon("exit", "assets/svg/ic_exit_to_app_black_24px.svg", 24)
                .icon("arrowDropDown", "assets/svg/ic_arrow_drop_down_white_24px.svg", 24)
                .icon("arrowDropUp", "assets/svg/ic_arrow_drop_up_white_24px.svg", 24)
                .icon("add", "assets/svg/ic_add_white_24px.svg", 24)
                .icon("close", "assets/svg/ic_close_white_24px.svg", 24)
                .icon("delete", "assets/svg/ic_delete_black_24px.svg", 24)
      

            $mdThemingProvider.theme('default');
    
            $mdThemingProvider.theme('docsDark', 'default')
                .primaryPalette('cyan', {'default':'200'})
                .dark();

            // Restangular config
            RestangularProvider.setBaseUrl('/api');

            // Satellizer config
            $authProvider.loginUrl = "api/login"
            $authProvider.tokenName = "token"
            $authProvider.tokenPrefix = "musicserver"
            
            // Storage config
            $sessionStorageProvider.setKeyPrefix('ms')
        }
    ])
    .component('msApp', AppComponent)
    .run(['$window',
        ($window) => { // Hide Loading page
            $window.loading_screen.finish();
        }
    ])

document.addEventListener('DOMContentLoaded', () => angular.bootstrap(document, ['musicserver'], {
    strictDi: true
}))

export default root