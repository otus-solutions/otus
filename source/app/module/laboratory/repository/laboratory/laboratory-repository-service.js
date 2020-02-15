(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.repository')
    .service('otusjs.laboratory.repository.LaboratoryRepositoryService', Service);

  Service.$inject = [
    'otusjs.laboratory.repository.LaboratoryCollectionService'
  ];

  function Service(LaboratoryCollectionService) {
    var self = this;
    /* Public methods */
    self.initializeLaboratory = initializeLaboratory;
    self.getLaboratory = getLaboratory;
    self.updateLaboratoryParticipant = updateLaboratoryParticipant;
    self.updateAliquots = updateAliquots;
    self.convertStorageAliquot = convertStorageAliquot;
    self.updateTubeCollectionData = updateTubeCollectionData;

    /* Laboratory Configuration Methods */
    self.getCheckingExist = getCheckingExist;
    self.getLaboratoryDescriptors = getLaboratoryDescriptors;
    self.getAliquotsDescriptors = getAliquotsDescriptors;

    /* Laboratory Project Methods */
    self.getAliquots = getAliquots;
    self.getLots = getLots;
    self.createLot = createLot;
    self.updateLot = updateLot;
    self.deleteLot = deleteLot;
    self.deleteAliquot = deleteAliquot;

    /* Unattached Laboratory Methods */
    self.attacheLaboratory = attacheLaboratory;


    function initializeLaboratory(participant) {
      LaboratoryCollectionService.useParticipant(participant);
      return LaboratoryCollectionService
        .initializeLaboratory()
        .then(function(laboratory) {
          return laboratory;
        });
    }

    function getCheckingExist() {
      return LaboratoryCollectionService.getCheckingExist();
    }

    function getLaboratory(participant) {
      LaboratoryCollectionService.useParticipant(participant);
      return LaboratoryCollectionService.getLaboratory();
    }

    function updateLaboratoryParticipant(laboratory) {
      return LaboratoryCollectionService.update(laboratory);
    }

    function updateAliquots(updateStructure) {
      return LaboratoryCollectionService.updateAliquots(updateStructure);
    }

    function convertStorageAliquot(aliquot) {
      return LaboratoryCollectionService.convertStorageAliquot(aliquot);
    }

    function updateTubeCollectionData(updateStructure){
      return LaboratoryCollectionService.updateTubeCollectionData(updateStructure);
    }

    function getLaboratoryDescriptors() {
      return LaboratoryCollectionService.getDescriptors();
    }

    function getAliquotsDescriptors() {
      return LaboratoryCollectionService.getAliquotDescriptors();
    }

    function getAliquots(lotAliquot, unique) {
      return LaboratoryCollectionService.getAliquots(lotAliquot, unique);
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

    function deleteAliquot(aliquotCode) {
      return LaboratoryCollectionService.deleteAliquot(aliquotCode);
    }

    function deleteLot(lotCode) {
      return LaboratoryCollectionService.deleteLot(lotCode);
    }

    function attacheLaboratory(recruitmentNumber, laboratoryIdentification) {
      return LaboratoryCollectionService.attacheLaboratory(recruitmentNumber,laboratoryIdentification);
    }
  }
}());
