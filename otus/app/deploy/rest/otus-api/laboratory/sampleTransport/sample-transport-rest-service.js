(function () {
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
    self.getAliquotsByPeriod = getAliquotsByPeriod;
    self.validateAliquot = validateAliquot;
    self.getLots = getLots;
    self.createLot = createLot;
    self.updateLot = updateLot;
    self.deleteLot = deleteLot;

    function initialize() {
      _rest = OtusRestResourceService.getSampleTransport();
    }

    function create() {
      _rest.create();
    }
    //TODO: AQUI
    function getAliquotsByPeriod(initialDate, finalDate, center, storage) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getAliquotsByPeriod({
        initialDate: initialDate,
        finalDate: finalDate,
        center: center,
        storage: storage
      }).$promise;
    }

    function getAliquots() {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getAliquots().$promise;
    }

    function validateAliquot(code, center) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.validateAliquot({
        center: center,
        code: code
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
