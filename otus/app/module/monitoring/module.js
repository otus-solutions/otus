(function() {
  'use strict';

  angular
    .module('otusjs.otus.monitoring', [
      'otusjs.monitoring.core',
      'otusjs.monitoring.business',
      'otusjs.monitoring.repository',
      'otusjs.monitoring.storage'
    ]);

}());
