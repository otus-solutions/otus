(function() {
  'use strict';

  angular
    .module('otusjs.participant.core', [])
    .run(Runner);

  Runner.$inject = [
    'otusjs.participant.core.ServiceLoader'
  ];

  function Runner(ServiceLoader) {
    ServiceLoader.execute();
  }

}());
