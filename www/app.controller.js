(function () {
  'use strict';

  angular
    .module('ionic-seed')
    .controller('AppController', AppController);

  function AppController() {
    var vm = this;
    vm.value = '';
  }
})();
