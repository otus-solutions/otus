(function() {
  'use strict';

  angular
    .module('otusjs.user.access.core', [])
    .run(Runner);

  Runner.$inject = [
    'otusjs.user.access.core.ModuleService'
  ];

  function Runner(ModuleService) {
    ModuleService.Service = {};
    ModuleService.DataSource = {};
  }

}());
