(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.repository')
    .service('otusjs.laboratory.repository.ParticipantLaboratoryRepositoryService', Service);

  Service.$inject = [
    'otusjs.laboratory.core.ModuleService',
    'otusjs.laboratory.repository.ParticipantLaboratoryCollectionService'
  ];

  function Service(ModuleService, ParticipantLaboratoryCollectionService) {
    var self = this;
    var laboratory = {};

    self.initializeLaboratory = initializeLaboratory;
    self.getLaboratory = getLaboratory;

    function initializeLaboratory(participant) {
      // var request = $q.defer();
      ParticipantLaboratoryCollectionService.useParticipant(participant);
      return ParticipantLaboratoryCollectionService
        .initializeLaboratory()
        .then(function(laboratory) {
          return laboratory;
        });
    }

    function getLaboratory(participant) {
      ParticipantLaboratoryCollectionService.useParticipant(participant);
      return ParticipantLaboratoryCollectionService.getLaboratory();
    }
  }
}());
