(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.repository')
    .service('otusjs.laboratory.repository.LaboratoryRepositoryService', Service);

  Service.$inject = [
    'otusjs.laboratory.core.ModuleService',
    'otusjs.laboratory.repository.LaboratoryCollectionService',
    '$q',
    '$http'
  ];

  function Service(ModuleService, LaboratoryCollectionService, $q, $http) {
    var self = this;
    var laboratory = {};

    self.initializeLaboratory = initializeLaboratory;
    self.getLaboratory = getLaboratory;
    self.updateLaboratoryParticipant = updateLaboratoryParticipant;
    self.updateAliquots = updateAliquots;

    //Laboratory Configuration Methods
    self.getLaboratoryDescriptors = getLaboratoryDescriptors;
    self.getAliquotsDescriptors = getAliquotsDescriptors;

    //Laboratory Project Methods
    self.getAliquots = getAliquots;
    self.getAliquotsByCenter = getAliquotsByCenter;
    self.getLots = getLots;
    self.createLot = createLot;
    self.updateLot = updateLot;
    self.deleteLot = deleteLot;


    function initializeLaboratory(participant) {
      LaboratoryCollectionService.useParticipant(participant);
      return LaboratoryCollectionService
        .initializeLaboratory()
        .then(function(laboratory) {
          return laboratory;
        });
    }

    function getLaboratory(participant) {
      LaboratoryCollectionService.useParticipant(participant);
      return LaboratoryCollectionService.getLaboratory();
      // return $http.get('app/module/laboratory/repository/laboratory/lab-participant.json');
    }

    function updateLaboratoryParticipant(laboratory) {
      return LaboratoryCollectionService.update(laboratory);
    }

    function updateAliquots(updateStructure) {
      return LaboratoryCollectionService.updateAliquots(updateStructure);
    }

    function getLaboratoryDescriptors() {
      // return LaboratoryCollectionService.getDescriptors();
      return $http.get('app/module/laboratory/repository/laboratory/lab-config.json');
    }

    function getAliquotsDescriptors() {
      // return LaboratoryCollectionService.getAliquotDescriptors();  // TODO: implement
      return $http.get('app/module/laboratory/repository/laboratory/aliquots-descriptors.json');
    }

    //TODO: Test this
    function getAliquots() {
      return LaboratoryCollectionService.getAliquots();
    }
    
    function getAliquotsByCenter(center) {
      return LaboratoryCollectionService.getAliquotsByCenter(center);
    }
    
    function getLots() {
      return LaboratoryCollectionService.getLots();
    }

    function createLot(lotStructure) {
      return LaboratoryCollectionService.createLot(lotStructure);
    }

    function updateLot(lotStructure) {
      return LaboratoryCollectionService.updateLot(lotStructure);
    }

    function deleteLot(lotCode) {
      return LaboratoryCollectionService.deleteLot(lotCode);
    }
  }
}());
