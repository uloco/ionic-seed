'use strict';

(function () {
  'use strict';

  angular.module('ionic-seed', ['ionic', 'ngCordova', 'ionic-seed.view']).run(function ($rootScope, $ionicPlatform, $window) {
    $ionicPlatform.ready(function () {

      if ($window.cordova && $window.cordova.plugins && $window.cordova.plugins.Keyboard) {
        $window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        $window.cordova.plugins.Keyboard.disableScroll(true);
      }

      if ($window.StatusBar) {
        $window.StatusBar.styleLightContent();
      }
    });
  });
})();
//# sourceMappingURL=app.js.map
