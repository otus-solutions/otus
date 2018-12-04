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
    'otusjs.laboratory.configuration.LaboratoryConfigurationService',
    'otusjs.laboratory.business.project.exams.ExamLotService',
    '$scope'
  ];

  function Controller($filter, LaboratoryConfigurationService, ExamLotService, $scope) {
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
      if(charCode == '13' && self.aliquotCode.length > 0) {
        self.fastInsertion(self.aliquotCode);
      }
    }


    function fastInsertion(newAliquotCode, hideMsgErrors) {
      var successInsertion = false;
      var foundInOtherLot;

      let aliquotFilter = {
        aliquotCode: newAliquotCode,
        fieldCenter: self.lot.fieldCenter,
        lotType: self.lot.aliquotName
      };

      if (_findAliquotInLot(aliquotFilter.aliquotCode)) {
        _setDuplicatedAliquotError(aliquotFilter.aliquotCode);
      } else {
        ExamLotService.getAliquot(aliquotFilter)
          .then(function (aliquot) {
            _clearAliquotError();
            _fillAliquotLabels(aliquot);
            self.lot.insertAliquot(aliquot);
            self.onLotAlteration({
              newData: self.lot.toJSON()
            });
            successInsertion = true;
            if (!hideMsgErrors) _dynamicDataTableUpdate();
          })
          .catch( error => {
            let errorMessage = error.data.MESSAGE;
            if(errorMessage.match(new RegExp("Data Validation Fail: Aliquot not found"))) _setAliquotNotFoundError(aliquotFilter.aliquotCode);
            if(errorMessage.match(new RegExp("Data Validation Fail: Invalid center."))) _setInvalidAliquotError(aliquotFilter.aliquotCode);
            if(errorMessage.match(new RegExp("Data Validation Fail: Invalid aliquot type."))) _setWrongTypeAliquotError(aliquotFilter.aliquotCode,error.data.CONTENT);
            if(errorMessage.match(new RegExp("Data Validation Fail: Already in a lot."))) _setAliquotInOtherLotError(aliquotFilter.aliquotCode,error.data.CONTENT);
            console.log(error);

          })
      }
      self.aliquotCode = "";
      return successInsertion;
    }

    function _fillAliquotLabels(aliquot) {
      aliquot.label = _getAliquotLabel(aliquot.name);
      aliquot.containerLabel = aliquot.container.toUpperCase() === "CRYOTUBE" ? "Criotubo" : "Palheta";
      aliquot.roleLabel = aliquot.role.toUpperCase() === "EXAM" ? "Exame" : "Armazenamento";
    }

    function _getAliquotLabel(aliquotName){
      let aliquotDescriptor = LaboratoryConfigurationService.getAliquotDescriptor(aliquotName);
      if(aliquotDescriptor)
        return aliquotDescriptor.label;
    }

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

    function _setWrongTypeAliquotError(aliquotCode, aliquotName) {
      var msg = 'A alíquota "' + aliquotCode + '" do tipo "' + _getAliquotLabel(aliquotName) + '" nâo pode ser inserida em um lote de "' + self.lot.aliquotLabel + '"';
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

    function _setAliquotInOtherLotError(aliquotCode, lotCode) {
      var msg = 'A alíquota "' + aliquotCode + '" já esta no lote de codigo "' + lotCode + '"';
      _setAliquotError(msg);
    }

    function _findAliquotInLot(code) {
      return self.lot.aliquotList.find(function (aliquotsInLot) {
        return aliquotsInLot.code == code;
      });
    }
  }
}());
