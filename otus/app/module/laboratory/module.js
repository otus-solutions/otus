(function() {
  'use strict';

  angular
    .module('otusjs.otus.laboratory', [
      'otusjs.laboratory.core',
      'otusjs.laboratory.business',
      'otusjs.laboratory.repository',
      'otusjs.laboratory.storage',
      'otusjs.laboratory.aliquot'
    ])
    .run(Runner);

  Runner.$inject = [
    'otusjs.laboratory.core.ModuleService',
    'otusjs.laboratory.core.ContextService',
    'otusjs.laboratory.core.EventService'
  ];

  function Runner(ModuleService, ContextService, EventService) {
    EventService.onParticipantSelected(ContextService.setSelectedParticipant);
    EventService.onParticipantSelected(ContextService.begin);
  }
}());
