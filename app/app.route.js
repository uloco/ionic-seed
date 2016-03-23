(function () {
  'use strict';

  angular
    .module('ionic-seed')
    .config(routesConfig);

  function routesConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('index', {
        url: '/',
        templateUrl: 'view/view.html',
        controller: 'ViewController'
      });

    $urlRouterProvider.otherwise('/');
  }
})();
