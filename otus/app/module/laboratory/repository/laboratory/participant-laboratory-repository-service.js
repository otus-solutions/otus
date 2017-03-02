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

    self.createLaboratory = createLaboratory;
    self.createLaboratoryEmpty = createLaboratoryEmpty;
    self.getLaboratory = getLaboratory;

    function createLaboratory(participant) {
      // var request = $q.defer();
      ParticipantLaboratoryCollectionService.useParticipant(participant);
      return ParticipantLaboratoryCollectionService
        .createLaboratory()
        .then(function(laboratory) {
          return laboratory;
        });
    }

    function createLaboratoryEmpty(participant) {
      // var request = $q.defer();
      ParticipantLaboratoryCollectionService.useParticipant(participant);
      return ParticipantLaboratoryCollectionService
        .createLaboratoryEmpty()
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
