(function () {
  'use strict';

  angular
    .module('ionic-seed', [
      'ionic',
      'ngCordova',
      'ng-feature'
    ])

    .run(function ($rootScope, $ionicPlatform, $window) {
      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default
        // (remove this to show the accessory bar above the keyboard for form
        // inputs)
        if ($window.cordova && $window.cordova.plugins &&
          $window.cordova.plugins.Keyboard) {
          $window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          $window.cordova.plugins.Keyboard.disableScroll(true);
        }

        // status bar
        if ($window.StatusBar) {
          // org.apache.cordova.statusbar required
          $window.StatusBar.styleLightContent();
        }
      });
    });
})();
