(function() {
  'use strict';

  angular
    .module('otusjs.otus', [
      'otusjs.activity',
      'otusjs.participant',
      'otusjs.user',
      'otusjs.user.access',
      'otusjs.otus.installer',
      'otusjs.otus.laboratory',
      'otusjs.otus.report',
      'otusjs.otus.monitoring',
      'otusjs.otus.dashboard',
      'otusjs.otus.uxComponent',
      'otusjs.application',
      'otusjs.deploy'
    ]);

}());
