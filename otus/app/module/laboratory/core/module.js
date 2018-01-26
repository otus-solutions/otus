(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.core', [
      // 'otusjs.laboratory.core.project'
    ])
    .run(Runner);

  Runner.$inject = [
      // 'otusjs.laboratory.core.ServiceLoader'
  ];

  function Runner() {
    // ServiceLoader.execute();
  }

}());
