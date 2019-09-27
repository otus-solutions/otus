(function() {
  'use strict';

  angular
    .module('otusjs.activity.core')
    .service('otusjs.activity.core.ServiceLoader', Service);

  Service.$inject = [
    'otusjs.activity.core.ModuleService'
  ];

  function Service(ModuleService) {
    var self = this;

    self.execute = execute;

    function execute() {
      ModuleService.Service = {};
      ModuleService.DataSource = {};
    }
  }
}());
