(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ExamsLotsRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.create = create;
    self.getLots = getLots;
    self.createLot = createLot;
    self.updateLot = updateLot;
    self.deleteLot = deleteLot;

    function initialize() {
      _rest = OtusRestResourceService.getExamLot();
    }

    function create() {
      _rest.create();
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
