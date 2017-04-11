(function() {
  'use strict';

  angular
    .module('otusjs.activity.core', [])
    .run(Runner);

  Runner.$inject = [
    'otusjs.activity.core.ServiceLoader'
  ];

  function Runner(ServiceLoader) {
    ServiceLoader.execute();
  }

}());
