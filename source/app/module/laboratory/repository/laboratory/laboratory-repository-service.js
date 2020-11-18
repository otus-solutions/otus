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
    self.getLaboratoryByTube = getLaboratoryByTube;
    self.updateLaboratoryParticipant = updateLaboratoryParticipant;
    self.updateAliquots = updateAliquots;
    self.convertStorageAliquot = convertStorageAliquot;
    self.updateTubeCollectionData = updateTubeCollectionData;
    self.updateTubeCollectionDataWithRn = updateTubeCollectionDataWithRn;
    self.updateAliquotsWithRn = updateAliquotsWithRn;
    self.updateTubeCustomMetadata = updateTubeCustomMetadata;

    /* Laboratory Configuration Methods */
    self.getCheckingExist = getCheckingExist;
    self.getLaboratoryDescriptors = getLaboratoryDescriptors;
    self.getAliquotsDescriptors = getAliquotsDescriptors;
    self.getTubeMedataDataByType = getTubeMedataDataByType;

    /* Laboratory Project Methods */
    self.getAliquots = getAliquots;
    self.getLots = getLots;
    self.getTube = getTube;
    self.createLot = createLot;
    self.updateLot = updateLot;
    self.deleteLot = deleteLot;
    self.deleteAliquot = deleteAliquot;

    /* Unattached Laboratory Methods */
    self.attacheLaboratory = attacheLaboratory;
    self.listUnattached = listUnattached;
    self.createUnattached = createUnattached;
    self.getUnattachedById = getUnattachedById;
    self.discardUnattached = discardUnattached;
    self.getUnattachedByIdentification = getUnattachedByIdentification;



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

    function getLaboratoryByTube(tubeCode) {
      return LaboratoryCollectionService.getLaboratoryByTube(tubeCode);
    }

    function updateLaboratoryParticipant(laboratory) {
      return LaboratoryCollectionService.update(laboratory);
    }

    function updateAliquots(updateStructure) {
      return LaboratoryCollectionService.updateAliquots(updateStructure);
    }

    function updateAliquotsWithRn(updateStructure, recruitmentNumber) {
      return LaboratoryCollectionService.updateAliquotsWithRn(updateStructure, recruitmentNumber);
    }

    function updateTubeCustomMetadata(tube){
      return LaboratoryCollectionService.updateTubeCustomMetadata(tube);
    }

    function convertStorageAliquot(aliquot) {
      return LaboratoryCollectionService.convertStorageAliquot(aliquot);
    }

    function updateTubeCollectionData(updateStructure){
      return LaboratoryCollectionService.updateTubeCollectionData(updateStructure);
    }

    function updateTubeCollectionDataWithRn(recruitmentNumber ,updateStructure){
      return LaboratoryCollectionService.updateTubeCollectionDataWithRn(recruitmentNumber, updateStructure);
    }

    function getLaboratoryDescriptors() {
      return LaboratoryCollectionService.getDescriptors();
    }

    function getAliquotsDescriptors() {
      return LaboratoryCollectionService.getAliquotDescriptors();
    }

    function getTubeMedataDataByType(tubeType) {
      return LaboratoryCollectionService.getTubeMedataDataByType(tubeType);
    }

    function getAliquots(lotAliquot, unique) {
      return LaboratoryCollectionService.getAliquots(lotAliquot, unique);
    }

    function getTube(locationPointId, tubeCode) {
      return LaboratoryCollectionService.getTube(locationPointId, tubeCode);
    }

    function getLots(locationPointId) {
      return LaboratoryCollectionService.getLots(locationPointId);
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

    function listUnattached(collectGroupName, center, page, quantity) {
      return LaboratoryCollectionService.listUnattached(collectGroupName, center, page, quantity);
    }

    function createUnattached(fieldCenterAcronym, collectGroupName) {
      return LaboratoryCollectionService.createUnattached(fieldCenterAcronym, collectGroupName);
    }

    function getUnattachedById(laboratoryOid) {
      return LaboratoryCollectionService.getUnattachedById(laboratoryOid);
    }

    function discardUnattached(laboratoryOid) {
      return LaboratoryCollectionService.discardUnattached(laboratoryOid);
    }

    function getUnattachedByIdentification(laboratoryIdentification) {
      return LaboratoryCollectionService.getUnattachedByIdentification(laboratoryIdentification);
    }

  }
}());
