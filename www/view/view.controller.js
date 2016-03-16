(function () {
  'use strict';

  angular
    .module('ionic-seed.view')
    .controller('ViewController', ViewController);

  function ViewController($log) {
    var vm = this;
    var name = 'World';

    vm.hello = `Hello ${name}`;

    $log.debug('hi');
  }
})();
