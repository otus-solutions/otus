(function() {
  'use strict';

  angular
    .module('otusjs.application.theme', [])
    .run(function($injector) {
      var currentModule = angular.module('otusjs.application.theme');
      var application = $injector.get('otusjs.application.core.ModuleService');
      application.notifyModuleLoad(currentModule.name);
      console.info('Theme module ready.');
    });

}());
