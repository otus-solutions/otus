(function() {
  'use strict';

  angular
    .module('otusjs.application', [
      'otusjs.application.dependency',
      'otusjs.application.environment',
      'otusjs.application.storage',
      'otusjs.application.session',
      'otusjs.application.context',
      'otusjs.application.core',
      'otusjs.application.state',
      'otusjs.application.http',
      'otusjs.application.locale',
      'otusjs.application.theme'
    ])
    .run(function() {
      console.info('Application module ready.');
    });

}());
