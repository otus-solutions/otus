(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusLotInfoManagerDisplay', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/lot-info-manager/display/lot-info-manager-display-template.html',
      bindings: {
        lot: '=',
        selectedAliquots: '=',
        lotDataSet: '<',
        aliquotsInOtherLotsList: '<',
        fullAliquotsList: '<',
        action: '<',
        setChartData: '&',
        onLotAlteration: '&'
      }
    });

  Controller.$inject = [
    '$mdDialog',
    '$mdToast',
    '$filter',
    'otusjs.laboratory.business.project.transportation.AliquotTransportationService'
  ];

  function Controller($mdDialog, $mdToast, $filter, AliquotTransportationService) {
    var self = this;

    const timeShowMsg = 3000;

    self.$onInit = onInit;

    self.currentNavItem = "insertionByPeriod";
    self.changeNavItem = changeNavItem;
    self.aliquotCode;
    self.initialDate;
    self.finalDate;

    self.AliquotTransportationService = AliquotTransportationService;

    self.aliquotInputkeydown = aliquotInputkeydown;
    self.insertAliquotsByPeriod = insertAliquotsByPeriod;
    self.periodInputkeydown = periodInputkeydown;
    self.dynamicDataTableChange = dynamicDataTableChange;

    var _confirmAliquotsInsertionByPeriod;

    function changeNavItem(newNavItem){
      self.currentNavItem = newNavItem;
    }


    /* Public methods */
    self.fastInsertion = fastInsertion;
    self.selectAliquot = selectAliquot;

    function onInit() {
      _updateContainerLabel();
      self.aliquotCode = "";
      self.initialDate = new Date();
      self.finalDate = new Date();
      _buildDialogs();

      //TODO: Remove This {
      //   setTimeout(()=>{
      //     self.fullAliquotsList.forEach(function (aliquot) {
      //     console.log('fullList',aliquot.code);
      //     console.log('fullList',aliquot.fieldCenter.acronym);
      //     });
      //   },1000)
      //TODO: }
    }

    function _buildDialogs() {
      _confirmAliquotsInsertionByPeriod = $mdDialog.confirm()
        .title('Confirmar inclusão de Aliquotas:')
        .textContent('Serão incluídas no Lot as aliquotas realizadas no perído selecionado.')
        .ariaLabel('Confirmar inclusão de Aliquotas por Período')
        .ok('Confirmar')
        .cancel('Cancelar');
    }

    function _dynamicDataTableUpdate(){
      AliquotTransportationService.dynamicDataTableFunction.updateDataTable();
      self.selectedAliquots = [];
    }

    function _updateContainerLabel(){
      self.lot.aliquotList.forEach(function(aliquot) {
        aliquot.containerLabel = AliquotTransportationService.getContainerLabelToAliquot(aliquot);
      }, this);
    }

    function insertAliquotsByPeriod(){
      if(self.initialDate instanceof Date && self.finalDate instanceof Date){
        self.initialDate = new Date(self.initialDate.toISOString());
        self.finalDate = new Date(self.finalDate.toISOString());

        if(self.initialDate <= self.finalDate){
          _confirmAliquotsInsertionByPeriod.textContent('Serão incluídas no Lot as aliquotas realizadas no período'
          + ' entre ' + $filter('date')(self.initialDate,'dd/MM/yyyy') + ' a ' + $filter('date')(self.finalDate,'dd/MM/yyyy') + '.');

          $mdDialog.show(_confirmAliquotsInsertionByPeriod).then(function() {
            var successInsertion = false;
            _findAliquotByPeriod(self.initialDate, self.finalDate).forEach(function(avaiableAliquot) {
              var returned = fastInsertion(avaiableAliquot.code, true);
              if(!successInsertion) successInsertion = returned;
            }, this);
            if(successInsertion){
              _successInAliquotInsertion();
              _dynamicDataTableUpdate();
            } else {
              _notAliquotsInserted();
            }
          });
        } else {
          _invalidPeriodInterval();
        }
      } else {
        _unselectedPeriod();
      }
    }

    function periodInputkeydown(event) {
      var charCode = event.which || event.keyCode;
      if(charCode == '13') {
        self.insertAliquotsByPeriod();
      }
    }

    function aliquotInputkeydown(event) {
      var charCode = event.which || event.keyCode;
      if(charCode == '13' && self.aliquotCode.length > 0) {
        self.fastInsertion(self.aliquotCode);
      }
    }


    function fastInsertion(newAliquotCode, hideMsgErrors) {
      var foundAliquot = _findAliquot(newAliquotCode);
      var successInsertion = false;

      if (foundAliquot) {
        if(foundAliquot.fieldCenter.acronym !== self.lot.fieldCenter.acronym){
          if(!hideMsgErrors) _toastWrongFieldCenter(newAliquotCode);
        } else if (_findAliquotInLot(newAliquotCode)) {
          if(!hideMsgErrors) _toastDuplicated(newAliquotCode);
        } else if (_findAliquotsInOtherLots(newAliquotCode)) {
          if(!hideMsgErrors) _toastOtherLot(newAliquotCode);
        } else {
          self.lot.insertAliquot(foundAliquot);
          self.onLotAlteration({
            newData: self.lot.toJSON()
          });
          self.setChartData();
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

    function _toastWrongFieldCenter(aliquotCode) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('A alíquota "' + aliquotCode + '" não pertence a este centro.')
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

    function _unselectedPeriod() {
      $mdToast.show(
        $mdToast.simple()
        .textContent('Por favor, selecione o Período Inicial e o Período Final antes de prosseguir.')
        .hideDelay(timeShowMsg)
      );
    }

    function _invalidPeriodInterval() {
      $mdToast.show(
        $mdToast.simple()
        .textContent('O Início do Período, não pode ser superior ao Final do Período.')
        .hideDelay(timeShowMsg)
      );
    }

    function _successInAliquotInsertion() {
      $mdToast.show(
        $mdToast.simple()
        .textContent('A(s) alíquota(s) foi(ram) inserida(s) com sucesso.')
        .hideDelay(timeShowMsg)
      );
    }

    function _notAliquotsInserted() {
      $mdToast.show(
        $mdToast.simple()
        .textContent('Nenhuma alíquota foi inserida.')
        .hideDelay(timeShowMsg)
      );
    }

    function _findAliquotByPeriod(initialDate, finalDate) {
      return self.fullAliquotsList.filter(function(avaiableAliquot) {
        var aliquotFormatedData = $filter('date')(avaiableAliquot.aliquotCollectionData.time,'yyyyMMdd');
        var initialDateFormated = $filter('date')(initialDate,'yyyyMMdd');
        var finalDateFormated = $filter('date')(finalDate,'yyyyMMdd');

        return (aliquotFormatedData >= initialDateFormated && aliquotFormatedData <= finalDateFormated);
      });
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

    function _findAliquotsInOtherLots(code) {
      return self.aliquotsInOtherLotsList.find(function(aliquotsInOtherLots) {
        return aliquotsInOtherLots.code == code;
      });
    }
  }
}());