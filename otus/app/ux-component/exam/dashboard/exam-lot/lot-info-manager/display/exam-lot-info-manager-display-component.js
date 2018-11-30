(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusExamLotInfoManagerDisplay', {
      controller: Controller,
      templateUrl: 'app/ux-component/exam/dashboard/exam-lot/lot-info-manager/display/exam-lot-info-manager-display-template.html',
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
    '$filter',
    'otusjs.laboratory.business.project.exams.ExamLotService',
    'otusjs.laboratory.WorkAliquotFactory',
    '$scope'
  ];

  function Controller($filter, ExamLotService, WorkAliquotFactory, $scope) {
    var self = this;

    self.$onInit = onInit;
    self.changeNavItem = changeNavItem;

    self.ExamLotService = ExamLotService;

    self.aliquotInputkeydown = aliquotInputkeydown;
    self.dynamicDataTableChange = dynamicDataTableChange;
    self.hasError = false;

    function changeNavItem(newNavItem) {
      self.currentNavItem = newNavItem;
    }

    /* Public methods */
    self.fastInsertion = fastInsertion;
    self.selectAliquot = selectAliquot;

    function onInit() {
      // self.aliquotCode = "";
      self.aliquotFilter = {
        //aliquotCode: '3530000719',
        aliquotCode: '',
        fieldCenter: {acronym: 'RS'},
        lotType: 'BIOCHEMICAL_SERUM'
      };
      self.initialDate = new Date();
      self.finalDate = new Date();
    }

    function _dynamicDataTableUpdate() {
      ExamLotService.dynamicDataTableFunction.updateDataTable();
      self.selectedAliquots = [];
    }

    // function aliquotInputkeydown(event) {
    //   var charCode = event.which || event.keyCode;
    //   if (charCode == '13' && self.aliquotCode.length > 0) {
    //     self.fastInsertion(self.aliquotCode);
    //   }
    // }


    function aliquotInputkeydown(event) {
      var charCode = event.which || event.keyCode;
      if (charCode == '13' && self.aliquotFilter.aliquotCode.length > 0) {
        self.fastInsertion(self.aliquotFilter);
      }
    }


    function fastInsertion(aliquotFilter, hideMsgErrors) {
      var foundAliquot;
      var successInsertion = false;
      var foundInOtherLot;

      if (_findAliquotInLot(aliquotFilter.aliquotCode)) {
        _setDuplicatedAliquotError(aliquotFilter.aliquotCode);
      } else {
        ExamLotService.getAliquot(aliquotFilter)
          .then(function (aliquot) {
            _clearAliquotError();
            self.lot.insertAliquot(aliquot);
            self.onLotAlteration({
              newData: self.lot.toJSON()
            });
            successInsertion = true;
            if (!hideMsgErrors) _dynamicDataTableUpdate();
          })
          .catch(function (err) {
            console.log(err);
          })
      }
      self.aliquotCode = "";
      return successInsertion;
    }


    // function fastInsertion(newAliquotCode, hideMsgErrors) {
    //   var foundAliquot = _findAliquot(newAliquotCode);
    //   var successInsertion = false;
    //   var foundInOtherLot;
    //
    //   if (foundAliquot) {
    //     if(self.lot.aliquotName !== foundAliquot.name){
    //       if(!hideMsgErrors) _setWrongTypeAliquotError(foundAliquot);
    //     } else if((foundAliquot.fieldCenter.acronym !== self.lot.fieldCenter.acronym) && (!_findAliquotsInTransportLots(newAliquotCode))){
    //       if(!hideMsgErrors) _setInvalidAliquotError(newAliquotCode);
    //     } else if (_findAliquotInLot(newAliquotCode)) {
    //       if(!hideMsgErrors) _setDuplicatedAliquotError(newAliquotCode);
    //     } else if (foundInOtherLot = _findAliquotsInOtherLots(newAliquotCode)) {
    //       if(!hideMsgErrors) _setAliquotInOtherLotError(foundInOtherLot);
    //     } else {
    //       _clearAliquotError();
    //       self.lot.insertAliquot(foundAliquot);
    //       self.onLotAlteration({
    //         newData: self.lot.toJSON()
    //       });
    //       successInsertion = true;
    //       if(!hideMsgErrors) _dynamicDataTableUpdate();
    //     }
    //   } else {
    //     if(!hideMsgErrors) _setAliquotNotFoundError(newAliquotCode);
    //   }
    //   self.aliquotCode = "";
    //   return successInsertion;
    // }
    //
    function dynamicDataTableChange(change) {
      if (change.type === 'select' || change.type === 'deselect') {
        self.selectAliquot(change.element);
      }
    }

    function _clearAliquotError() {
      $scope.formAliquot['fast-trigger'].$setValidity('customValidation', true);
    }

    function _setAliquotError(msg) {
      self.error = msg;
      $scope.formAliquot['fast-trigger'].$setValidity('customValidation', false);
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

    function _setWrongTypeAliquotError(foundAliquot) {
      var aliquot = WorkAliquotFactory.create(foundAliquot);
      var msg = 'A alíquota "' + aliquot.code + '" do tipo "' + aliquot.label + '" nâo pode ser inserida em um lote de "' + self.lot.aliquotLabel + '"';
      _setAliquotError(msg);
    }

    function _setAliquotNotFoundError(aliquotCode) {
      var msg = 'A alíquota "' + aliquotCode + '" não foi encontrada.';
      _setAliquotError(msg);
    }

    function _setDuplicatedAliquotError(aliquotCode) {
      var msg = 'A alíquota "' + aliquotCode + '" já esta no lote.';
      _setAliquotError(msg);
    }

    function _setInvalidAliquotError(aliquotCode) {
      var msg = 'A alíquota "' + aliquotCode + '" não pertence a este centro ou não está em um lote de transporte.';
      _setAliquotError(msg);
    }

    function _setAliquotInOtherLotError(aliquotData) {
      var msg = 'A alíquota "' + aliquotData.aliquot.code + '" já esta no lote de codigo "' + aliquotData.lotCode + '"';
      _setAliquotError(msg);
    }

    function _findAliquotInLot(code) {
      return self.lot.aliquotList.find(function (aliquotsInLot) {
        return aliquotsInLot.code == code;
      });
    }

    function _findAliquot(code) {
      return self.fullAliquotsList.find(function (availableAliquot) {
        return availableAliquot.code == code;
      });
    }

    function _findAliquotsInTransportLots(code) {
      return self.aliquotsInTransportLot.find(function (aliquotInTransportLot) {
        return aliquotInTransportLot.code == code;
      });
    }

    function _findAliquotsInOtherLots(code) {
      return self.aliquotsInOtherLots.find(function (aliquotsInOtherLots) {
        return aliquotsInOtherLots.aliquot.code == code;
      });
    }
  }
}());
