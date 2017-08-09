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
    'otusjs.laboratory.business.project.transportation.AliquotTransportationService',
    '$filter',
    '$mdToast'
  ];


  function Controller($stateParams, AliquotTransportationService, $filter, $mdToast) {
    var self = this;
    var _aliquotsInOtherLots = [];

    self.$onInit = onInit;
    self.fastInsertion = fastInsertion;
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
      _findAliquotsInOtherLots();
      _fetchgCollectedAliquots();
    }

    function newLot() {
      console.log('newLot function');
      AliquotTransportationService.createLot(self.lot, true);
      AliquotTransportationService.createLot(self.lot, false);
    }

    function changeLot() {
      console.log('changeLot function');
      AliquotTransportationService.alterLot(self.lot, true);
      AliquotTransportationService.alterLot(self.lot, false);

    }

    function fastInsertion(element, aliquotCode) {
      if (aliquotCode.length === 9) {
        var foundAliquot = _findAliquot(aliquotCode);
        if (foundAliquot) {
          if (_findAliquotInLot(aliquotCode)) {
            _toastDuplicated(element.aliquot_code);
          } else {
            if (_getAliquotsInOtherLots(aliquotCode)) {
              _toastOtherLot(element.aliquot_code);
            }else {
              self.lot.insertAliquot(foundAliquot)
            }
          }
        } else {
          _toastError(element.aliquot_code);
        }
        element.aliquot_code = '';
      }
    }

    function _toastError(aliquotCode) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('aliquota ' + aliquotCode + ' não encontrada')
        .hideDelay(1000)
      );
    }

    function _toastDuplicated(aliquotCode) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('aliquota ' + aliquotCode + ' já esta no lote')
        .hideDelay(1000)
      );
    }

    function _toastOtherLot(aliquotCode) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('aliquota ' + aliquotCode + ' já esta em outro lote')
        .hideDelay(1000)
      );
    }

    function _formatLotDates() {
        self.lot.shipmentDate.setSeconds(0);
        self.lot.shipmentDate.setMilliseconds(0);
        self.lot.processingDate.setSeconds(0);
        self.lot.processingDate.setMilliseconds(0);
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

    function _findAliquotsInOtherLots(){
      for (let i = 0; i < $stateParams.lots.length; i++) {
        for (let j = 0; j < $stateParams.lots[i].aliquotList.length; j++) {
          _aliquotsInOtherLots.push($stateParams.lots[i].aliquotList[j]);
        }
      }
    }

    function _getAliquotsInOtherLots(code) {
      return _aliquotsInOtherLots.find(function(avaiableAliquot) {
        return avaiableAliquot.code == code;
      });
    }

    function _findAliquotInLot(code) {
      return self.lot.aliquotList.find(function(avaiableAliquot) {
        return avaiableAliquot.code == code;
      });
    }

    function _findAliquot(code) {
      return self.fullAliquotsList.find(function(avaiableAliquot) {
        return avaiableAliquot.code == code;
      });
    }
  }
}());
