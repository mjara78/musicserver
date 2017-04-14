// /app/app.js
import angular from 'angular'  
import uiRouter from 'angular-ui-router'
import 'angular-animate';
import 'angular-aria';
import 'angular-material';

import common from './common/common.module'  
import components from './components/components.module'  
import { AppComponent } from './app.component'

const root = angular  
  .module('musicserver', [
    uiRouter,
    common,
    components,
    'ngMaterial'
  ])
  .config(($mdIconProvider, $mdThemingProvider) => {
    // Register the icons
    $mdIconProvider
      .icon("menu", "assets/svg/menu.svg", 24)
      .icon("appLogo", "assets/svg/logo.svg",24)
      .icon("home", "assets/svg/ic_home_black_24px.svg",24)
      .icon("playlist", "assets/svg/ic_playlist_play_black_24px.svg",24)
      .icon("listening", "assets/svg/ic_queue_music_black_24px.svg",24)
      .icon("musicLib", "assets/svg/ic_library_music_black_24px.svg",24)
      .icon("settings", "assets/svg/ic_settings_black_24px.svg",24)
      ;

    $mdThemingProvider.theme('default');
  })
  .component('msApp', AppComponent)
  .run( ($window) => { // Hide Loading page
    $window.loading_screen.finish();
  })

document.addEventListener('DOMContentLoaded', () => angular.bootstrap(document, ['musicserver']))



export default root  