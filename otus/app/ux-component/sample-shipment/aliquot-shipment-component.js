(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusAliquotShipmentComponent', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-shipment/aliquot-shipment-template.html'
    });

  Controller.$inject = [
     'otusjs.laboratory.business.transportation.AliquotTransportationService'
  ];


  function Controller(TransportationService) {
    var self = this;

    self.$onInit = onInit;
    self.fastInsertion = fastInsertion;

    function onInit() {
      self.lot = TransportationService.createAliquotLot();
      console.log(self.lot);
    }

    function fastInsertion(element, tubeCode) {
      if (tubeCode.length === 9) {
        var foundAliquot = _findAliquot(tubeCode);
        self.lot.insertAliquot(foundAliquot);
        element.aliquot_code = '';
      }
    }

    function _findAliquot(code) {
       return {code: code};
    }
  }
}());
