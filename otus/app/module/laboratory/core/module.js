(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.core', [])
    .run(Runner);

  Runner.$inject = [
      // 'otusjs.laboratory.core.ServiceLoader'
  ];

  function Runner() {
    // ServiceLoader.execute();
  }

}());
