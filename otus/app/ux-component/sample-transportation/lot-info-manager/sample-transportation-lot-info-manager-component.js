(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationLotInfoManager', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/lot-info-manager/sample-transportation-lot-info-manager-template.html'
    });

  Controller.$inject = [
    '$stateParams',
    'otusjs.laboratory.business.project.transportation.AliquotTransportationService'
  ];
  // TODO: remover Logs
  function Controller($stateParams, AliquotTransportationService) {
    var self = this;

    self.$onInit = onInit;
    self.newLot = newLot;
    self.changeLot = changeLot;

    function onInit() {
      if ($stateParams.selectedLot) {
        self.lot = AliquotTransportationService.loadAliquotLotFromJson($stateParams.selectedLot);
        self.lot.shipmentDate = new Date(self.lot.shipmentDate);
        self.lot.processingDate = new Date(self.lot.processingDate);
      } else {
        self.lot = AliquotTransportationService.createAliquotLot();
        self.lot.shipmentDate = new Date();
        self.lot.processingDate = new Date();
      }
      _formatLotDates();
      _getAliquotsInOtherLots();
      _fetchgCollectedAliquots();
    }

    function newLot() {
      // TODO: Novo lote
      console.log('newLot function');
      console.log(self.lot.toJSON());
      AliquotTransportationService.createLot(self.lot, true);
      AliquotTransportationService.createLot(self.lot, false);
    }

    function changeLot() {
      // TODO: Alterar lote
      console.log('changeLot function');
      AliquotTransportationService.alterLot(self.lot, true);
      AliquotTransportationService.alterLot(self.lot, false);
    }

    function _formatLotDates() {
      self.lot.shipmentDate.setSeconds(0);
      self.lot.shipmentDate.setMilliseconds(0);
      self.lot.processingDate.setSeconds(0);
      self.lot.processingDate.setMilliseconds(0);
    }

    function _getAliquotsInOtherLots() {
      self.aliquotsInOtherLots = [];
      for (let i = 0; i < $stateParams.lots.length; i++) {
        for (let j = 0; j < $stateParams.lots[i].aliquotList.length; j++) {
          self.aliquotsInOtherLots.push($stateParams.lots[i].aliquotList[j]);
        }
      }
    }

    function _fetchgCollectedAliquots() {
      AliquotTransportationService.getFullAliquotsList()
        .then(function(response) {
          self.fullAliquotsList = response.data; // TODO: fix
          console.group('aliquots-list');
          self.fullAliquotsList.forEach(function(aliquot) {
            console.log(aliquot.code);
          });
          console.groupEnd('aliquots-list');
        });
    }
  }
}());
