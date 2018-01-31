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
    var _deleteAlreadyUsedAliquotsDialog;

    //TODO: Colors for the aliquots types in the charts, the colors will be dynamic in the future
    var color = ["#F44336","#E91E63","#9C27B0","#673AB7","#3F51B5","#2196F3",
      "#03A9F4","#00BCD4","#009688","#4CAF50","#8BC34A","#CDDC39",
      "#FFEB3B","#FFC107","#FF9800","#FF5722","#795548","#9E9E9E",
      "#9E9E9E","#000000","#B71C1C","#880E4F","#4A148C","#311B92",
      "#1A237E","#0D47A1","#01579B","#006064","#004D40","#1B5E20"];

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public methods */
    self.createLot = createLot;
    self.cancel = cancel;
    self.alterLot = alterLot;
    self.updateLotStateData = updateLotStateData;
    self.removeAliquots = removeAliquots;
    self.setChartData = setChartData;

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
        self.lot.fieldCenter = { "acronym" : self.stateData['user'].fieldCenter.acronym ? self.stateData['user'].fieldCenter.acronym : laboratoryContextService.getSelectedFieldCenter()};
        self.lot.shipmentDate = new Date();
        self.lot.processingDate = new Date();
      }
      _buildDialogs();
      _formatLotDates();
      _getAliquotsInOtherLots();
      _fetchgCollectedAliquots();
      self.setChartData();
    }

    function removeAliquots() {
      var aliquotsCount = self.selectedAliquots.length;

      for (var i = 0; i < self.selectedAliquots.length; i++) {
        var aliquotIndex = self.lot.aliquotList.indexOf(self.selectedAliquots[i]);
        self.lot.removeAliquotByIndex(aliquotIndex);
      }
      self.updateLotStateData(self.lot);
      self.selectedAliquots = [];
      AliquotTransportationService.dynamicDataTableFunction.updateDataTable();
      self.setChartData();
      _toastAliquotsRemoved(aliquotsCount);
    }

    function createLot() {
      AliquotTransportationService.createLot(self.lot.toJSON()).then(function() {
        ApplicationStateService.activateSampleTransportationManagerList();
        self.updateLotStateData();
      }, function(err) {
        _backendErrorAliquotsAlreadyUsed(err.data.CONTENT.value);
        _toastOtherLot()
      });
    }

    function alterLot() {
      AliquotTransportationService.updateLot(self.lot).then(function() {
        ApplicationStateService.activateSampleTransportationManagerList();
        self.updateLotStateData();
      }, function(err) {
        _backendErrorAliquotsAlreadyUsed(err.data.CONTENT.value);
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
        .textContent('Alíquota(s) em outro(s) lote(s)')
        .hideDelay(3000)
      );
    }

    function _toastAliquotsRemoved(count) {
      $mdToast.show(
        $mdToast.simple()
        .textContent(count +' Alíquota(s) removida(s).')
        .hideDelay(3000)
      );
    }

    function _backendErrorAliquotsAlreadyUsed(aliquotsArray){
      _deleteAlreadyUsedAliquotsDialog.textContent(
        'A(s) aliquota(s): '
        + _convertArrayToStringIncludesLastPosition(aliquotsArray,' e ')
        + ' estão em outro(s) lote(s), deseja remove-la(s) do lote atual?'
      );

      $mdDialog.show(_deleteAlreadyUsedAliquotsDialog).then(function() {
        self.selectedAliquots = aliquotsArray;
        removeAliquots()
      })
      .catch(function() {
        _hasErrorBackEnd(aliquotsArray);
      });
    }

    function _convertArrayToStringIncludesLastPosition(array, includes){
      var text = "";
      array.forEach(function(value, index) {
        if(index == 0){
          text = text + value;
        } else {
          if(index == array.length - 1){
            text = text + includes + value;
          } else {
            text = text + ', ' + value;
          }
        }
      }, this);

      return text;
    }

    function _hasErrorBackEnd(errorAliquots) {
      for (var i = 0; i < errorAliquots.length; i++) {
        for (var j = 0; j < self.lot.aliquotList.length; j++) {
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

      _deleteAlreadyUsedAliquotsDialog = $mdDialog.confirm()
        .title('Aliquota(s) utilizada(s) em outro(s) Lote(s), remover aliquotas?')
        .textContent('A(s) aliquota(s): "asd5a4s5sa4a" estão em outro(s) lote(s), deseja remove-la(s) do lote atual?')
        .ariaLabel('Confirmação de cancelamento')
        .ok('Ok')
        .cancel('Voltar');
    }

    function setChartData() {
      if (!self.lot.chartDataSet.chartId) {
        self.lot.chartDataSet.chartId = "1";
      }
      self.lot.chartDataSet.fieldCenter = self.lot.fieldCenter;
      self.lot.chartDataSet.backgroundColor = color;
    }

  }
}());
