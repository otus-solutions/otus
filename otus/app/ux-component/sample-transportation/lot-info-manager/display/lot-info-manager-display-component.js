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
        aliquotsInOtherLotsList: '<',
        fullAliquotsList: '<',
        action: '<',
        onLotAlteration: '&'
      }
    });

  Controller.$inject = [
    '$mdToast',
    'otusjs.laboratory.business.project.transportation.AliquotTransportationService'
  ];

  function Controller($mdToast, AliquotTransportationService) {
    var self = this;

    const timeShowMsg = 3000;

    self.$onInit = onInit;

    /* Public methods */
    self.fastInsertion = fastInsertion;
    self.selectAliquot = selectAliquot;

    function onInit() {
      _updateContainerLabel();
    }

    function _updateContainerLabel(){
      self.lot.aliquotList.forEach(function(aliquot) {
        aliquot.containerLabel = AliquotTransportationService.getContainerLabelToAliquot(aliquot);
      }, this);
    }


    function fastInsertion(event, element) {
      var charCode = event.which || event.keyCode;
      if(charCode == '13' && element.aliquot_code.length > 0) {
        var foundAliquot = _findAliquot(element.aliquot_code);
        if (foundAliquot) {
          if (_findAliquotInLot(element.aliquot_code)) {
            _toastDuplicated(element.aliquot_code);
          } else if (_findAliquotsInOtherLots(element.aliquot_code)) {
            _toastOtherLot(element.aliquot_code);
          } else {
            self.lot.insertAliquot(foundAliquot);
            self.onLotAlteration({
              newData: self.lot.toJSON()
            });
            _updateContainerLabel();
          }
        } else {
          _toastError(element.aliquot_code);
        }
        element.aliquot_code = '';
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
      return self.fullAliquotsList.find(function(avaiableAliquot) {
        return avaiableAliquot.code == code;
      });
    }

    function _findAliquotsInOtherLots(code) {
      return self.aliquotsInOtherLotsList.find(function(aliquotsInOtherLots) {
        return aliquotsInOtherLots.code == code;
      });
    }
  }
}());