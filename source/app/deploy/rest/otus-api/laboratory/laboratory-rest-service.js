(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.LaboratoryRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;
    var _participantRest = null;
    var _configurationRest = null;
    var _unattachedRest = null;

    /* Public methods */
    self.initialize = initialize;
    self.create = create;
    self.initializeLaboratory = initializeLaboratory;
    self.getLaboratory = getLaboratory;
    self.getLaboratoryByTube = getLaboratoryByTube;
    self.updateLaboratoryParticipant = updateLaboratoryParticipant;
    self.updateAliquots = updateAliquots;
    self.convertStorageAliquot = convertStorageAliquot;
    self.deleteAliquot = deleteAliquot;
    self.updateTubeCollectionData = updateTubeCollectionData;
    self.updateTubeCustomMetadata = updateTubeCustomMetadata;
    self.getLotReceiptMetadata = getLotReceiptMetadata;

    /* Laboratory Configuration Methods*/
    self.getDescriptors = getDescriptors;
    self.getCheckingExist = getCheckingExist;
    self.getAliquotDescriptors = getAliquotDescriptors;
    self.getAliquotConfiguration = getAliquotConfiguration;
    self.getTubeMedataDataByType = getTubeMedataDataByType;

    /* Unattached Laboratory Methods */
    self.initializeUnattached = initializeUnattached;
    self.attacheLaboratory = attacheLaboratory;
    self.listUnattached = listUnattached;
    self.getUnattachedById = getUnattachedById;
    self.discardUnattached = discardUnattached;
    self.getUnattachedByIdentification = getUnattachedByIdentification;


    function initialize() {
      _participantRest = OtusRestResourceService.getLaboratoryParticipantResource();
      _configurationRest = OtusRestResourceService.getLaboratoryConfigurationResource();
      _unattachedRest = OtusRestResourceService.getUnattachedLaboratoryResource();
    }

    /* laboratory-participant methods */
    function create() {
      _participantRest.create();
    }

    function initializeLaboratory(recruitmentNumber) {
      if (!_participantRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _participantRest.initialize({
        rn: recruitmentNumber
      }).$promise;
    }

    function getLaboratory(recruitmentNumber) {
      if (!_participantRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _participantRest.getLaboratory({
        rn: recruitmentNumber
      }).$promise;
    }

    function getLaboratoryByTube(tubeCode) {
      if (!_participantRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _participantRest.getLaboratoryByTube({
        tubeCode: tubeCode
      }).$promise;
    }

    function updateLaboratoryParticipant(recruitmentNumber, participantLaboratory) {
      if (!_participantRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _participantRest.update({
        rn: recruitmentNumber
      }, participantLaboratory).$promise;
    }

    function updateAliquots(recruitmentNumber, persistanceStructure) {
      if (!_participantRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _participantRest.updateAliquots({
        rn: recruitmentNumber
      }, persistanceStructure).$promise;
    }

    function convertStorageAliquot(aliquot) {
      if (!_participantRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _participantRest.convertStorageAliquot(aliquot).$promise;
    }

    function deleteAliquot(aliquotCode) {
      if (!_participantRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _participantRest.deleteAliquot({code: aliquotCode}).$promise;
    }

    function updateTubeCollectionData(recruitmentNumber, updateStructure) {
      if (!_participantRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _participantRest.updateTubeCollectionData({
        rn: recruitmentNumber
      }, updateStructure).$promise;
    }

    function updateTubeCustomMetadata(tube){
      if (!_participantRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _participantRest.updateTubeCustomMetadata(tube).$promise;
    }

    /* laboratory-configuration methods */
    function getDescriptors() {
      if (!_configurationRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _configurationRest.getDescriptors().$promise;
    }

    function getCheckingExist() {
      if (!_configurationRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _configurationRest.getCheckingExist().$promise;
    }

    function getAliquotDescriptors() {
      if (!_configurationRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _configurationRest.getAliquotDescriptors().$promise;
    }

    function getAliquotConfiguration() {
      if (!_configurationRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _configurationRest.getAliquotConfiguration().$promise;
    }

    function getTubeMedataDataByType(tubeType) {
      if (!_configurationRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _configurationRest.getTubeMedataDataByType({type: tubeType}).$promise;
    }

    function getLotReceiptMetadata() {
      if (!_configurationRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _configurationRest.getLotReceiptMetadata().$promise;
    }


    /* Unattached Laboratory Methods */

    function initializeUnattached(acronym, descriptorName) {
      if (!_configurationRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _unattachedRest.initialize({acronym:acronym,descriptorName:descriptorName}).$promise;
    }

    function attacheLaboratory(recruitmentNumber, laboratoryIdentification) {
      if (!_configurationRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _unattachedRest.attache({recruitmentNumber:recruitmentNumber,laboratoryIdentification:laboratoryIdentification}).$promise;
    }

    function listUnattached(collectGroupName, center, page, quantity) {
      if (!_configurationRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _unattachedRest.listLaboratories({descriptorName:collectGroupName, acronym:center, page:page, quantity:quantity}).$promise;
    }

    function getUnattachedById(laboratoryOid) {
      if (!_configurationRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _unattachedRest.getById({laboratoryOid:laboratoryOid}).$promise;
    }

    function discardUnattached(laboratoryOid) {
      if (!_configurationRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _unattachedRest.discard({laboratoryOid:laboratoryOid}).$promise;
    }

    function getUnattachedByIdentification(laboratoryIdentification) {
      if (!_configurationRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _unattachedRest.getByIdentification({laboratoryIdentification:laboratoryIdentification}).$promise;
    }

  }
}());
