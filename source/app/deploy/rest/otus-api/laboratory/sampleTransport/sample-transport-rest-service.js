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
    self.getLotsByOrigin = getLotsByOrigin;
    self.getLotsByDestination = getLotsByDestination;
    self.getTube = getTube;
    self.createLot = createLot;
    self.updateLot = updateLot;
    self.deleteLot = deleteLot;
    self.updateLotReceipt = updateLotReceipt;
    self.receiveMaterial = receiveMaterial;
    self.getMaterialMetadataOptions = getMaterialMetadataOptions;
    self.getMaterialTrackingList = getMaterialTrackingList;

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

    function getLots(originLocationPointId, destinationLocationPointId) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getLots({ originLocationPointId, destinationLocationPointId }).$promise;
    }

    function getLotsByOrigin(originLocationPointId) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getLotsByOrigin({ originLocationPointId }).$promise;
    }

    function getLotsByDestination(destinationLocationPointId) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getLotsByDestination({ destinationLocationPointId }).$promise;
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

    function updateLotReceipt(lotCode, lotReceipt) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.updateLotReceipt({
        code: lotCode
      }, lotReceipt).$promise;
    }

    /*material data*/
    /*{materialCode: String, receiptMetadata: OID}*/
    function receiveMaterial(receiveMaterialStruct) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.receiveMaterial(receiveMaterialStruct).$promise;
    }

    function getMaterialMetadataOptions(materialType) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getMetadataOptions({materialType}).$promise;
    }

    /*material code*/
    //aliquot or tube
    function getMaterialTrackingList(materialCode) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getMaterialTrackingList({materialCode}).$promise;
    }
  }
}());
