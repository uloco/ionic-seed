(function () {
  'use strict';

  angular
    .module('ionic-seed')
    .controller('AppController', AppController);

  function AppController($log) {

    var vm = this;
    vm.value = '';

    // some sample ES6 code
    let arr = [1, 2, 3, 4];
    var arr2 = arr.map(x => x * x);
    $log.debug('arr2', arr2);

    let x = 6;
    let y = 4;

    let f = 6;

    $log.debug(x, y, f);
  }
})();
