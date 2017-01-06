(function() {
  'use strict';

  angular
    .module('otusjs.application.environment', [])
    .run(function($injector) {
      var currentModule = angular.module('otusjs.application.environment');
      var application = $injector.get('otusjs.application.core.ModuleService');
      application.notifyModuleLoad(currentModule.name);
      console.info('Environment module ready.');
    });

}());
