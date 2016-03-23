(function () {
  'use strict';

  angular
    .module('ionic-seed')
    .controller('AppController',

  function () {

    var vm = this;
    vm.value = '';

    // some sample ES6 code
    let arr = [111, 2, 3, 4];
    var arr2 = arr.map(x => x * x);
    console.log('arr2', arr2);

    let x = 666;
    let y = 4;

    let f = 6;
    let g = 4;

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

  })
})();
