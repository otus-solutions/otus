(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusExamLotInfoManager', {
      controller: Controller,
      templateUrl: 'app/ux-component/exams-lots/dashboard/dashboard-display/lot-info-manager/exam-lot-info-manager-template.html',
      bindings: {
        stateData: "<",
        lots: "<"
      }
    });

  Controller.$inject = [
    '$mdToast',
    '$mdDialog',
    'otusjs.laboratory.core.ContextService',
    'otusjs.laboratory.business.project.transportation.ExamLotService',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller($mdToast, $mdDialog, laboratoryContextService, ExamLotService, ApplicationStateService) {
    var self = this;
    var _confirmCancel;
    var _deleteAlreadyUsedAliquotsDialog;


    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public methods */
    self.createLot = createLot;
    self.cancel = cancel;
    self.alterLot = alterLot;
    self.updateLotStateData = updateLotStateData;
    self.removeAliquots = removeAliquots;

    function onInit() {
      self.selectedAliquots = [];
      self.action = laboratoryContextService.getLotInfoManagerAction();
      if (self.stateData['selectedLot']) {
        self.lot = ExamLotService.loadAliquotLotFromJson(self.stateData['selectedLot']);
        self.lot.realizationDate = new Date(self.lot.realizationDate);
      } else {
        self.lot = ExamLotService.createAliquotLot();
        self.lot.aliquotName = laboratoryContextService.getSelectedExamType();
        self.lot.operator = self.stateData['user'].email;
        self.lot.fieldCenter = { "acronym" : self.stateData['user'].fieldCenter.acronym ? self.stateData['user'].fieldCenter.acronym : laboratoryContextService.getSelectedFieldCenter()};
        self.lot.realizationDate = new Date();
      }
      _buildDialogs();
      _formatLotDates();
      _getAliquotsInOtherLots();
      _fetchgCollectedAliquots();
    }

    function removeAliquots() {
      var aliquotsCount = self.selectedAliquots.length;

      for (var i = 0; i < self.selectedAliquots.length; i++) {
        var aliquotIndex = self.lot.aliquotList.indexOf(self.selectedAliquots[i]);
        self.lot.removeAliquotByIndex(aliquotIndex);
      }
      self.updateLotStateData(self.lot);
      self.selectedAliquots = [];
      ExamLotService.dynamicDataTableFunction.updateDataTable();
      _toastAliquotsRemoved(aliquotsCount);
    }

    function createLot() {
      ExamLotService.createLot(self.lot.toJSON()).then(function() {
        ApplicationStateService.activateSampleTransportationManagerList();
        self.updateLotStateData();
      }, function(err) {
        _backendErrorAliquotsAlreadyUsed(err.data.CONTENT.value);
        _toastOtherLot()
      });
    }

    function alterLot() {
      ExamLotService.updateLot(self.lot).then(function() {
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
      self.lot.realizationDate.setSeconds(0);
      self.lot.realizationDate.setMilliseconds(0);
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
      ExamLotService.getAliquots()
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
  }
}());
