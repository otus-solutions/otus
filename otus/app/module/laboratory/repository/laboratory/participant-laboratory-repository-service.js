(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.repository')
    .service('otusjs.laboratory.repository.ParticipantLaboratoryRepositoryService', Service);

  Service.$inject = [
    'otusjs.laboratory.core.ModuleService',
    'otusjs.laboratory.repository.ParticipantLaboratoryCollectionService',
    '$http'
  ];

  function Service(ModuleService, ParticipantLaboratoryCollectionService, $http) {
    var self = this;
    var laboratory = {};

    self.initializeLaboratory = initializeLaboratory;
    self.getLaboratory = getLaboratory;
    self.getLaboratoryDescriptors = getLaboratoryDescriptors;
    self.updateLaboratoryParticipant = updateLaboratoryParticipant;

    function initializeLaboratory(participant) {
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
      // return $http.get('app/module/laboratory/repository/laboratory/lab-participant.json');
    }

    function getLaboratoryDescriptors(){
      return ParticipantLaboratoryCollectionService.getDescriptors();
      // return $http.get('app/module/laboratory/repository/laboratory/lab-config.json');
   }

   function updateLaboratoryParticipant(laboratory){
      return ParticipantLaboratoryCollectionService.update(laboratory);
   }
  }
}());
