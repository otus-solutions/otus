(function() {
  'use strict';

  angular
    .module('otusjs.user.core', [])
    .run(Runner);

  Runner.$inject = [
    'otusjs.user.core.ServiceLoader'
  ];

  function Runner(ServiceLoader) {
    ServiceLoader.execute();
  }

}());
