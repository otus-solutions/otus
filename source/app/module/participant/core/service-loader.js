(function() {
  'use strict';

  angular
    .module('otusjs.participant.core')
    .service('otusjs.participant.core.ServiceLoader', Service);

  Service.$inject = [
    'otusjs.participant.core.ModuleService'
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
