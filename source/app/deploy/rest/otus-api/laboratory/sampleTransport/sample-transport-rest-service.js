(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.SampleTransportRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.create = create;
    self.getAliquots = getAliquots;
    self.getLots = getLots;
    self.getTube = getTube;
    self.createLot = createLot;
    self.updateLot = updateLot;
    self.deleteLot = deleteLot;

    function initialize() {
      _rest = OtusRestResourceService.getSampleTransport();
    }

    function create() {
      _rest.create();
    }

    function getAliquots(lotAliquot, unique) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      if (unique) {
        return _rest.getAliquot({locationPointId: lotAliquot.locationPoint}, lotAliquot).$promise;
      }
      return _rest.getAliquotsByPeriod({locationPointId: lotAliquot.locationPoint}, lotAliquot).$promise;
    }

    function getLots(locationPointId) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getLots({locationPointId}).$promise;
    }

    function getTube(locationPointId, tubeCode) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getTube({locationPointId, tubeCode}).$promise;
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
      return _rest.deleteLot({
        id: lotCode
      }).$promise;
    }
  }
}());
