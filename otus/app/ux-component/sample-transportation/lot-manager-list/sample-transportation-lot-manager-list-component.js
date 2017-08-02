(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationLotManagerList', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/lot-manager-list/sample-transportation-lot-manager-list-template.html'
    });

  Controller.$inject = [
    'otusjs.laboratory.business.transportation.AliquotTransportationService'
  ];

  function Controller(AliquotTransportationService) {
    var self = this;
    var _selectedLot = [];

    self.$onInit = onInit;
    self.selectLot = selectLot;

    function onInit() {
      _LoadLotsList();
    }

    function _LoadLotsList() {
      self.lotsList = AliquotTransportationService.loadLots().then(function(response) {
         self.lotsList = response;
      });
    }

    function selectLot(lot) {
      _selectedLot = lot;
      console.log(_selectedLot);
      //
      // if (activityIndex > -1) {
      //   _selectedLot.splice(activityIndex, 1);
      //   lot.isSelected = false;
      // } else {
      //   _selectedLots.push(lot);
      //   lot.isSelected = true;
      // }
    }
  }
}());
