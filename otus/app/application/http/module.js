(function() {
  'use strict';

  angular
    .module('otusjs.application.http', [])
    .run(runner);

    runner.$inject = [
      '$injector'
    ];

    function runner($injector) {
      var currentModule = angular.module('otusjs.application.http');
      var application = $injector.get('otusjs.application.core.ModuleService');
      application.notifyModuleLoad(currentModule.name);
      console.info('Http module ready.');
    }
}());
