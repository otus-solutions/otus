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
    '$mdDialog',
    'otusjs.laboratory.core.ContextService',
    'otusjs.laboratory.business.project.transportation.MaterialTransportationService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.application.dialog.DialogShowService'
  ];

  function Controller($mdToast, $mdDialog, laboratoryContextService, MaterialTransportationService, ApplicationStateService, DialogService) {
    var self = this;
    var _confirmCancel, _confirmationSave, _confirmationUpdate;
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
        self.lot = MaterialTransportationService.loadAliquotLotFromJson(self.stateData['selectedLot']);
        self.lot.shipmentDate = new Date(self.lot.shipmentDate);
        self.lot.processingDate = new Date(self.lot.processingDate);
      } else {
        self.lot = MaterialTransportationService.createAliquotLot();
        self.lot.operator = self.stateData['user'].email;
        self.lot.shipmentDate = new Date();
        self.lot.processingDate = new Date();
      }
      _buildDialogs();
      _formatLotDates();
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
      MaterialTransportationService.dynamicDataTableFunction.updateDataTable();
      self.setChartData();
      _toastAliquotsRemoved(aliquotsCount);
    }

    function createLot() {
      if (!self.lot.destinationLocationPoint.length || !self.lot.originLocationPoint.length) {
        _toastRouterEmpty();
        return;
      }
      MaterialTransportationService.createLot(self.lot.toJSON()).then(function() {
        DialogService.showDialog(_confirmationSave).then(function() {
          self.updateLotStateData();
          ApplicationStateService.activateSampleTransportationManagerList();
        }).catch(function () {
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
        DialogService.showDialog(_confirmationUpdate).then(function() {
          self.updateLotStateData();
          ApplicationStateService.activateSampleTransportationManagerList();
        }).catch(function () {
          self.updateLotStateData();
          ApplicationStateService.activateSampleTransportationManagerList();
        });
      }, function(err) {
        _backendErrorAliquotsAlreadyUsed(err.data.CONTENT.value);
        _toastOtherLot();
      });
    }

    function cancel() {
     DialogService.showDialog(_confirmCancel).then(function() {
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



    function _toastAliquotsRemoved(count) {
      $mdToast.show(
        $mdToast.simple()
        .textContent(count +' Alíquota(s) removida(s).')
        .hideDelay(3000)
      );
    }

    function _backendErrorAliquotsAlreadyUsed(aliquotsArray){
      _deleteAlreadyUsedAliquotsDialog.textDialog =
        'A(s) aliquota(s): '
        + _convertArrayToStringIncludesLastPosition(aliquotsArray,' e ')
        + ' estão em outro(s) lote(s), deseja remove-la(s) do lote atual?';

      DialogService.showDialog(_deleteAlreadyUsedAliquotsDialog).then(function() {
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

    function _buildDialogs() {
      self.getButtons = getButtons;

      self.buttons = [
        {
          message:'Ok',
          action:function(){$mdDialog.hide()},
          class:'md-raised md-primary'
        },
        {
          message:'Voltar',
          action:function(){$mdDialog.cancel()},
          class:'md-raised md-no-focus'
        }
      ];

      function getButtons(){
        return self.buttons;
      }

      _confirmCancel = {
        dialogToTitle:'Cancelamento',
        titleToText:'Confirmar cancelamento:',
        textDialog:'As alterações realizadas no lote serão descartadas.',
        ariaLabel:'Confirmação de cancelamento',
        buttons: getButtons()
      };
      _confirmationSave = {
        dialogToTitle:'Confirmação',
        titleToText:'Lote salvo com sucesso:',
        textDialog:'O material inserido no lote encontra-se disponível para o destino informado.',
        ariaLabel:'Confirmação de sucesso',
        buttons: [ {
          message:'Ok',
          action:function(){$mdDialog.hide()},
          class:'md-raised md-primary'
        }]
      };

      _confirmationUpdate = {
        dialogToTitle:'Confirmação',
        titleToText:'Lote alterado com sucesso:',
        textDialog:'O material alterado no lote encontra-se disponível para o destino informado.',
        ariaLabel:'Confirmação de sucesso',
        buttons: [ {
          message:'Ok',
          action:function(){$mdDialog.hide()},
          class:'md-raised md-primary'
        }]
      };
      _deleteAlreadyUsedAliquotsDialog = {
        dialogToTitle:'Cancelamento',
        titleToText:'Aliquota(s) utilizada(s) em outro(s) Lote(s), remover aliquotas?',
        textDialog:'A(s) aliquota(s): "asd5a4s5sa4a" estão em outro(s) lote(s), deseja remove-la(s) do lote atual?',
        ariaLabel:'Confirmação de cancelamento',
        buttons: getButtons()
      };
    }

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
