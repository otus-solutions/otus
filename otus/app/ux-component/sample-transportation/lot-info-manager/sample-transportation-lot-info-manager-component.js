(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationLotInfoManager', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/lot-info-manager/sample-transportation-lot-info-manager-template.html',
      bindings: {
        stateData: "<",
        lots: "<"
      }
    });

  Controller.$inject = [
    '$mdToast',
    '$mdDialog',
    'otusjs.laboratory.core.ContextService',
    'otusjs.laboratory.business.project.transportation.AliquotTransportationService',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller($mdToast, $mdDialog, laboratoryContextService, AliquotTransportationService, ApplicationStateService) {
    var self = this;
    var _confirmCancel;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public methods */
    self.createLot = createLot
    self.cancel = cancel;
    self.alterLot = alterLot;
    self.updateLotStateData = updateLotStateData;
    self.removeAliquots = removeAliquots;


    function onInit() {
      self.selectedAliquots = [];
      self.action = laboratoryContextService.getLotInfoManagerAction();
      if (self.stateData['selectedLot']) {
        self.lot = AliquotTransportationService.loadAliquotLotFromJson(self.stateData['selectedLot']);
        self.lot.shipmentDate = new Date(self.lot.shipmentDate);
        self.lot.processingDate = new Date(self.lot.processingDate);
      } else {
        self.lot = AliquotTransportationService.createAliquotLot();
        self.lot.operator = self.stateData['user'].email;
        self.lot.shipmentDate = new Date();
        self.lot.processingDate = new Date();
      }
      _buildDialogs();
      _formatLotDates();
      _getAliquotsInOtherLots();
      _fetchgCollectedAliquots();
    }

    function removeAliquots() {
      for (var i = 0; i < self.selectedAliquots.length; i++) {
        var aliquotIndex = self.lot.aliquotList.indexOf(self.selectedAliquots[i]);
        self.lot.removeAliquotByIndex(aliquotIndex);
      }
      self.updateLotStateData(self.lot);
      self.selectedAliquots = [];
    }

    function createLot() {
      AliquotTransportationService.createLot(self.lot.toJSON()).then(function() {
        ApplicationStateService.activateSampleTransportationManagerList();
        self.updateLotStateData();
      }, function(err) {
        _hasErrorBackEnd(err.data.CONTENT.value);
        _toastOtherLot()
      });
    }

    function alterLot() {
      AliquotTransportationService.updateLot(self.lot).then(function() {
        ApplicationStateService.activateSampleTransportationManagerList();
        self.updateLotStateData();
      }, function(err) {
        _hasErrorBackEnd(err.data.CONTENT.value);
        _toastOtherLot()
      });
    }

    function cancel() {
      $mdDialog.show(_confirmCancel).then(function() {
        self.updateLotStateData();
        ApplicationStateService.activateSampleTransportationManagerList();
      });
    }

    function updateLotStateData(newData) {
      laboratoryContextService.selectLot(newData);
    }

    function _toastOtherLot() {
      $mdToast.show(
        $mdToast.simple()
        .textContent('aliquota(s) em outro(s) lote(s)')
        .hideDelay(2000)
      );
    }

    function _hasErrorBackEnd(errorAliquots) {
      for (let i = 0; i < errorAliquots.length; i++) {
        for (let j = 0; j < self.lot.aliquotList.length; j++) {
          if (self.lot.aliquotList[j].code == errorAliquots[i]) {
            self.lot.aliquotList[j].hasError = true;
          }
        }
      }
      self.updateLotStateData(self.lot);
    }

    function _formatLotDates() {
      self.lot.shipmentDate.setSeconds(0);
      self.lot.shipmentDate.setMilliseconds(0);
      self.lot.processingDate.setSeconds(0);
      self.lot.processingDate.setMilliseconds(0);
    }

    function _getAliquotsInOtherLots() {
      self.aliquotsInOtherLots = [];
      for (var i = 0; i < self.lots.length; i++) {
        for (var j = 0; j < self.lots[i].aliquotList.length; j++) {
          self.aliquotsInOtherLots.push(self.lots[i].aliquotList[j]);
        }
      }
    }

    function _fetchgCollectedAliquots() {
      AliquotTransportationService.getAliquots()
        .then(function(response) {
          self.fullAliquotsList = response;
        });
    }

    function _buildDialogs() {
      _confirmCancel = $mdDialog.confirm()
        .title('Confirmar cancelamento:')
        .textContent('As alterações realizadas no lote serão descartadas')
        .ariaLabel('Confirmação de cancelamento')
        .ok('Ok')
        .cancel('Voltar');
    }
  }
}());
