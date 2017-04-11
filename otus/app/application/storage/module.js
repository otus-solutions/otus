(function() {
  'use strict';

  angular
    .module('otusjs.application.storage', [
      'lokijs'
    ])
    .run(function($injector) {
      var currentModule = angular.module('otusjs.application.storage');
      var application = $injector.get('otusjs.application.core.ModuleService');
      application.notifyModuleLoad(currentModule.name);
      console.info('Storage module ready.');
    });

}());
