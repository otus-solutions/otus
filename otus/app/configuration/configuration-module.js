(function() {
  'use strict';

  angular
    .module('otusjs.otus.configuration', [
      'otusjs.otus.configuration.dependency',
      'otusjs.otus.configuration.environment',
      'otusjs.otus.configuration.http',
      'otusjs.otus.configuration.locale',
      'otusjs.otus.configuration.state',
      'otusjs.otus.configuration.theme'
    ]);

}());
