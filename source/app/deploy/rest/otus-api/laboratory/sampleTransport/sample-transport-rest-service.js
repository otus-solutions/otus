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
    self.getAliquotsByLocationPoint = getAliquotsByLocationPoint;
    self.getLotsByLocationPoint = getLotsByLocationPoint;
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
        return _rest.getAliquot({}, lotAliquot).$promise;
      } else {
        return _rest.getAliquotsByPeriod({}, lotAliquot).$promise;
      }
    }

    function getAliquotsByLocationPoint(locationPointId) {
      if (!_rest){
        throw new Error('Rest resource is no initialized.');
      }
      return _rest.getAliquotsByLocationPoint({locationPointId}).$promise
    }

    function getLotsByLocationPoint(locationPointId) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getLotsByLocationPoint({locationPointId}).$promise;
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
