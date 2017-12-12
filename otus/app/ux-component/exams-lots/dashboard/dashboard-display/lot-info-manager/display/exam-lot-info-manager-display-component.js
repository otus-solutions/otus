(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusExamLotInfoManagerDisplay', {
      controller: Controller,
      templateUrl: 'app/ux-component/exams-lots/dashboard/dashboard-display/lot-info-manager/display/exam-lot-info-manager-display-template.html',
      bindings: {
        lot: '=',
        selectedAliquots: '=',
        aliquotsInTransportLot: '<',
        aliquotsInOtherLots: '<',
        fullAliquotsList: '<',
        action: '<',
        onLotAlteration: '&'
      }
    });

  Controller.$inject = [
    '$mdDialog',
    '$mdToast',
    '$filter',
    'otusjs.laboratory.business.project.exams.ExamLotService'
  ];

  function Controller($mdDialog, $mdToast, $filter, ExamLotService) {
    var self = this;

    const timeShowMsg = 3000;

    self.$onInit = onInit;
    self.changeNavItem = changeNavItem;

    self.ExamLotService = ExamLotService;

    self.aliquotInputkeydown = aliquotInputkeydown;
    self.dynamicDataTableChange = dynamicDataTableChange;

    var _confirmAliquotsInsertionByPeriod;

    function changeNavItem(newNavItem){
      self.currentNavItem = newNavItem;
    }

    /* Public methods */
    self.fastInsertion = fastInsertion;
    self.selectAliquot = selectAliquot;

    function onInit() {
      console.log(self.lot);
      _updateContainerLabel();
      self.aliquotCode = "";
      self.initialDate = new Date();
      self.finalDate = new Date();
      _buildDialogs();
    }

    function _buildDialogs() {
      _confirmAliquotsInsertionByPeriod = $mdDialog.confirm()
        .title('Confirmar inclusão de Alíquotas:')
        .textContent('Serão incluídas no lote as Alíquotas realizadas no perído selecionado.')
        .ariaLabel('Confirmar inclusão de Alíquotas por Período')
        .ok('Confirmar')
        .cancel('Cancelar');
    }

    function _dynamicDataTableUpdate(){
      ExamLotService.dynamicDataTableFunction.updateDataTable();
      self.selectedAliquots = [];
    }

    function _updateContainerLabel(){
      self.lot.aliquotList.forEach(function(aliquot) {
        aliquot.containerLabel = ExamLotService.getContainerLabelToAliquot(aliquot);
      }, this);
    }


    function aliquotInputkeydown(event) {
      var charCode = event.which || event.keyCode;
      if(charCode == '13' && self.aliquotCode.length > 0) {
        self.fastInsertion(self.aliquotCode);
      }
    }


    function fastInsertion(newAliquotCode, hideMsgErrors) {
      console.log(self.fullAliquotsList);
      var foundAliquot = _findAliquot(newAliquotCode);
      var successInsertion = false;

      if (foundAliquot) {
        if(self.lot.aliquotName !== foundAliquot.name){
          console.log(foundAliquot);
          if(!hideMsgErrors) _toastWrongTypeAliquot(foundAliquot);
        } else if((foundAliquot.fieldCenter.acronym !== self.lot.fieldCenter.acronym) && (!_findAliquotsInTransportLots(newAliquotCode))){
          if(!hideMsgErrors) _toastInvalid(newAliquotCode);
        } else if (_findAliquotInLot(newAliquotCode)) {
          if(!hideMsgErrors) _toastDuplicated(newAliquotCode);
        } else if (_findAliquotsInOtherLots(newAliquotCode)) {
          if(!hideMsgErrors) _toastOtherLot(newAliquotCode);
        } else {
          self.lot.insertAliquot(foundAliquot);
          self.onLotAlteration({
            newData: self.lot.toJSON()
          });
          _updateContainerLabel();
          successInsertion = true;
          if(!hideMsgErrors) _dynamicDataTableUpdate();
        }
      } else {
        if(!hideMsgErrors) _toastError(newAliquotCode);
      }
      self.aliquotCode = "";
      return successInsertion;
    }

    function dynamicDataTableChange(change){
      if(change.type === 'select' || change.type === 'deselect'){
        self.selectAliquot(change.element);
      }
    }


    function selectAliquot(aliquot) {
      var aliquotIndex = self.selectedAliquots.indexOf(aliquot);
      if (aliquotIndex > -1) {
        self.selectedAliquots.splice(aliquotIndex, 1);
        aliquot.isSelected = false;
      } else {
        self.selectedAliquots.push(aliquot);
        aliquot.isSelected = true;
      }
    }

    function _toastWrongTypeAliquot(aliquot) {
      $mdToast.show(
        $mdToast.simple()
          .textContent('A alíquota "' + aliquot.code + '" do tipo "'+aliquot.name+'" nâo pode ser inserida em um lote de "'+self.lot.aliquotName)
          .hideDelay(timeShowMsg)
      );
    }

    function _toastError(aliquotCode) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('A alíquota "' + aliquotCode + '" não foi encontrada.')
        .hideDelay(timeShowMsg)
      );
    }

    function _toastDuplicated(aliquotCode) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('A alíquota "' + aliquotCode + '" já esta no lote.')
        .hideDelay(timeShowMsg)
      );
    }

    function _toastInvalid(aliquotCode) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('A alíquota "' + aliquotCode + '" não pertence a este centro ou não está em um lote de transporte.')
        .hideDelay(timeShowMsg)
      );
    }

    function _toastOtherLot(aliquotCode) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('A alíquota "' + aliquotCode + '" já esta em outro lote.')
        .hideDelay(timeShowMsg)
      );
    }

    function _findAliquotInLot(code) {
      return self.lot.aliquotList.find(function(aliquotsInLot) {
        return aliquotsInLot.code == code;
      });
    }

    function _findAliquot(code) {
      return self.fullAliquotsList.find(function(availableAliquot) {
        return availableAliquot.code == code;
      });
    }

    function _findAliquotsInTransportLots(code) {
      return self.aliquotsInTransportLot.find(function(aliquotInTransportLot) {
        return aliquotInTransportLot.code == code;
      });
    }

    function _findAliquotsInOtherLots(code) {
      return self.aliquotsInOtherLots.find(function(aliquotsInOtherLots) {
        return aliquotsInOtherLots.code == code;
      });
    }
  }
}());