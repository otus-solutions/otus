(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationLotInfoManager', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/lot-info-manager/sample-transportation-lot-info-manager-template.html',
      bindings: {
        stateData: "<"
      }
    });

  Controller.$inject = [
    '$mdToast',
    'otusjs.laboratory.core.ContextService',
    'otusjs.laboratory.business.project.transportation.MaterialTransportationService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.application.dialog.DialogShowService'
  ];

  function Controller($mdToast, laboratoryContextService, MaterialTransportationService, ApplicationStateService, DialogService) {
    var self = this;

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
        self.lot = MaterialTransportationService.loadAliquotLotFromJson(self.stateData['selectedLot']);
        self.lot.shipmentDate = new Date(self.lot.shipmentDate);
        self.lot.processingDate = new Date(self.lot.processingDate);
      } else {
        self.lot = MaterialTransportationService.createAliquotLot();
        self.lot.operator = self.stateData['user'].email;
        self.lot.shipmentDate = new Date();
        self.lot.processingDate = new Date();
      }
      _formatLotDates();
      self.setChartData();
    }

    function removeAliquots() {
      let removedCount = self.selectedAliquots.length;
      self.selectedAliquots.forEach((data) => {
        if(_isAliquot(data)) {
          const index = self.lot.aliquotList.indexOf(data);
          self.lot.removeAliquotByIndex(index);
        } else {
          self.lot.tubeList.find((tube, index) => {
            tube.code === data.code ?
              self.lot.removeTubeByIndex(index) : "";
          });
        }
      })
      self.updateLotStateData(self.lot);
      self.selectedAliquots = [];
      MaterialTransportationService.dynamicDataTableFunction.updateDataTable(self.lot.aliquotList.concat(self.lot.getTubeForDynamicTable()));
      self.setChartData();
      _toastMaterialsRemoved(removedCount);
    }

    function _isAliquot(data) {
      return data.hasOwnProperty("name");
    }

    function createLot() {
      if (!self.lot.destinationLocationPoint.length || !self.lot.originLocationPoint.length) {
        _toastRouterEmpty();
        return;
      }

      MaterialTransportationService.createLot(self.lot.toJSON()).then(function() {
        DialogService.showWarningDialog(
          'Confirmação',
          'Lote salvo com sucesso:',
          'O material inserido no lote encontra-se disponível para o destino informado.',
          'Confirmação de sucesso')
          .then(function() {
            self.updateLotStateData();
            ApplicationStateService.activateSampleTransportationManagerList();
          })
          .catch(function () {
            self.updateLotStateData();
            ApplicationStateService.activateSampleTransportationManagerList();
          });
      }, function(err) {
        _backendErrorAliquotsAlreadyUsed(err.data.CONTENT.value);
        _toastOtherLot()
      });
    }

    function alterLot() {
      MaterialTransportationService.updateLot(self.lot).then(function() {
        DialogService.showWarningDialog(
          'Confirmação',
          'Lote alterado com sucesso:',
          'O material alterado no lote encontra-se disponível para o destino informado.',
          'Confirmação de sucesso')
          .then(function() {
            self.updateLotStateData();
            ApplicationStateService.activateSampleTransportationManagerList();
          })
          .catch(function () {
            self.updateLotStateData();
            ApplicationStateService.activateSampleTransportationManagerList();
          });
      }, function(err) {
        _backendErrorAliquotsAlreadyUsed(err.data.CONTENT.value);
        _toastOtherLot();
      });
    }

    function cancel() {
      DialogService.showConfirmationDialog(
        'Confirmar cancelamento:',
        'As alterações realizadas no lote serão descartadas.',
        'Confirmação de cancelamento')
        .then(function() {
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

    function _toastRouterEmpty() {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Informe o rastreio do lote.')
          .hideDelay(3000)
      );
    }

    function _toastMaterialsRemoved(count) {
      const text = count +' Material(is) removido(s).';
      $mdToast.show(
        $mdToast.simple()
        .textContent(text)
        .hideDelay(3000)
      );
    }

    function _backendErrorAliquotsAlreadyUsed(aliquotsArray){
      const textDialog =
        'A(s) aliquota(s): '
        + _convertArrayToStringIncludesLastPosition(aliquotsArray,' e ')
        + ' estão em outro(s) lote(s), deseja remove-la(s) do lote atual?';

      DialogService.showConfirmationDialog(
        'Aliquota(s) utilizada(s) em outro(s) Lote(s), remover aliquotas?',
        textDialog,
        'Confirmação de cancelamento')
        .then(function() {
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

    // function _fetchCollectedAliquots() { TODO: TIAGO
    //   MaterialTransportationService.getAliquots()
    //     .then(function(response) {
    //       self.fullAliquotsList = response;
    //     });
    // }

    function setChartData() {
      if (!self.lot.chartAliquotDataSet.chartId) {
        self.lot.chartAliquotDataSet.chartId = self.lot.code || "1";
        self.lot.chartTubeDataSet.chartId = self.lot.code || "2";
      }
      self.lot.chartAliquotDataSet.backgroundColor = color;
      self.lot.chartTubeDataSet.backgroundColor = color;
    }

  }
}());
