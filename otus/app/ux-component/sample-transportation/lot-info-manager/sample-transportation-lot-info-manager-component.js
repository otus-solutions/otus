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
    '$mdDialog',
    'otusjs.laboratory.core.ContextService',
    'otusjs.laboratory.business.project.transportation.AliquotTransportationService',
    'otusjs.application.state.ApplicationStateService'
  ];

  // TODO: remover Logs
  function Controller($mdDialog, laboratoryContextService, AliquotTransportationService, ApplicationStateService) {
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
      // TODO: Novo lote
      self.updateLotStateData();
      AliquotTransportationService.createLot(self.lot);
      ApplicationStateService.activateSampleTransportationManagerList();
    }

    function alterLot() {
      // TODO: Alterar lote
      self.updateLotStateData();
      AliquotTransportationService.alterLot(self.lot);
      ApplicationStateService.activateSampleTransportationManagerList();
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

    function _formatLotDates() {
      self.lot.shipmentDate.setSeconds(0);
      self.lot.shipmentDate.setMilliseconds(0);
      self.lot.processingDate.setSeconds(0);
      self.lot.processingDate.setMilliseconds(0);
    }

    function _getAliquotsInOtherLots() {
      self.aliquotsInOtherLots = [];
      for (let i = 0; i < self.lots.length; i++) {
        for (let j = 0; j < self.lots[i].aliquotList.length; j++) {
          self.aliquotsInOtherLots.push(self.lots[i].aliquotList[j]);
        }
      }
    }

    function _fetchgCollectedAliquots() {
      AliquotTransportationService.getAliquots()
        .then(function(response) {
          self.fullAliquotsList = response; // TODO: fix
          console.group('aliquots-list');
          self.fullAliquotsList.forEach(function(aliquot) {
            console.log(aliquot.code);
          });
          console.groupEnd('aliquots-list');
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
