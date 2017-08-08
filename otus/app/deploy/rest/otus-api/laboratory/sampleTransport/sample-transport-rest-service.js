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

    function getAliquots(center) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getAliquots({
        center: center
      }).$promise;
    }

    function getLots(center) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getLots({
        center: center
      }).$promise;
    }

    function createLot(sampleLot) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.createLot({
        sampleLot: sampleLot
      }).$promise;
    }

    function updateLot(id, sampleLot) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.updateLot({ id: id }, sampleLot).$promise;
    }

    function deleteLot(id) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.deleteLot({
        id: id
      }).$promise;
    }
  }
}());
