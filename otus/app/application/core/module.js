(function() {
  'use strict';

  angular
    .module('otusjs.application.core', [])
    .run(runner);

    runner.$inject = [
      '$injector'
    ];

    function runner($injector) {
      var currentModule = angular.module('otusjs.application.core');
      var application = $injector.get('otusjs.application.core.ModuleService');
      application.notifyModuleLoad(currentModule.name);
      console.info('Core module ready.');
    }
}());
