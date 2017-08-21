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
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.create = create;
    self.initializeLaboratory = initializeLaboratory;
    self.getLaboratory = getLaboratory;
    self.updateLaboratoryParticipant = updateLaboratoryParticipant;
    self.updateAliquots = updateAliquots;
    self.getDescriptors = getDescriptors;

    //Laboratory Project Methods
    self.getAliquots = getAliquots;
    self.getAliquotsByCenter = getAliquotsByCenter;
    self.getLots = getLots;
    self.createLot = createLot;
    self.updateLot = updateLot;
    self.deleteLot = deleteLot;

    function initialize() {
      _rest = OtusRestResourceService.getLaboratoryParticipantResource();
    }

    function create() {
      _rest.create();
    }

    function initializeLaboratory(recruitmentNumber) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.initialize({
        rn: recruitmentNumber
      }).$promise;
    }

    function getLaboratory(recruitmentNumber) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getLaboratory({
        rn: recruitmentNumber
      }).$promise;
    }

    function updateLaboratoryParticipant(recruitmentNumber, participantLaboratory) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.update({rn: recruitmentNumber}, participantLaboratory).$promise;
    }

    function updateAliquots(recruitmentNumber, persistanceStructure) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.updateAliquots({rn: recruitmentNumber}, persistanceStructure).$promise;
    }

    function getDescriptors() {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getDescriptors().$promise;
    }

    
    function getAliquots() {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getAliquots().$promise;
    }

    function getAliquotsByCenter(center) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getAliquotsByCenter({
        center: center
      }).$promise;
    }

    function getLots() {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getLots().$promise;
    }

    function createLot(persistanceStructure) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.createLot({}, persistanceStructure).$promise;
    }

    function updateLot(persistanceStructure) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.updateLot({}, persistanceStructure).$promise;
    }

    function deleteLot(lotCode) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.deleteLot({id: lotCode}).$promise;
    }
  }
}());
