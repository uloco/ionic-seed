(function () {
  'use strict';

  angular
    .module('ionic-seed')
    .controller('AppController', AppController);

  function AppController() {

    var vm = this;
    vm.value = '';

    // some sample ES6 code
    let arr = [1, 2, 3, 4];
    var arr2 = arr.map(x => x * x);
    console.log('arr2', arr2);

    let x = 6;
    let y = 4;

    var a = [
      'Hydrogen',
      'Helium',
      'Lithium',
      'Beryllium'
    ];


    var a2 = a.map(function (s) {
      return s.length;
    });

    var a3 = a.map(s => s.length);
    let test = 'testmessage';

  }
})();
