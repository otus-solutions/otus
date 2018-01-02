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

    /* Public methods */
    self.initialize = initialize;
    self.create = create;
    self.initializeLaboratory = initializeLaboratory;
    self.getLaboratory = getLaboratory;
    self.updateLaboratoryParticipant = updateLaboratoryParticipant;
    self.updateAliquots = updateAliquots;
    self.updateTubeCollectionData = updateTubeCollectionData;

    /* Laboratory Configuration Methods*/
    self.getDescriptors = getDescriptors;
    self.getAliquotDescriptors = getAliquotDescriptors;
    self.getAliquotConfiguration = getAliquotConfiguration;

    function initialize() {
      _participantRest = OtusRestResourceService.getLaboratoryParticipantResource();
      _configurationRest = OtusRestResourceService.getLaboratoryConfigurationResource();
    }

    //laboratory-participant methods
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

    function updateLaboratoryParticipant(recruitmentNumber, participantLaboratory) {
      if (!_participantRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _participantRest.update({
        rn: recruitmentNumber
      }, participantLaboratory).$promise;
    }

    function updateTubeCollectionData(recruitmentNumber, updateStructure) {
      if (!_participantRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _participantRest.updateTubeCollectionData({
        rn: recruitmentNumber
      }, updateStructure).$promise;
    }

    function updateAliquots(recruitmentNumber, persistanceStructure) {
      if (!_participantRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _participantRest.updateAliquots({
        rn: recruitmentNumber
      }, persistanceStructure).$promise;
    }

    //laboratory-configuration methods
    function getDescriptors() {
      if (!_configurationRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _configurationRest.getDescriptors().$promise;
    }

    function getAliquotConfiguration() {
      if (!_configurationRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _configurationRest.getAliquotConfiguration().$promise;
    }

    function getAliquotDescriptors() {
      if (!_configurationRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _configurationRest.getAliquotDescriptors().$promise;
    }
  }
}());
