(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusLotInfoManagerDisplay', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/lot-info-manager/display/lot-info-manager-display-template.html',
      bindings: {
        lot: '=',
        aliquotsInOtherLotsList: '<',
        fullAliquotsList: '<',
        onLotAlteration: '&',
        action: '<'
      }
    });

  Controller.$inject = [
    '$mdToast'
  ];

  function Controller($mdToast) {
    var self = this;

    self.fastInsertion = fastInsertion;

    function fastInsertion(element) {
      if (element.aliquot_code.length >= 9) {
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
          }
        } else {
          _toastError(element.aliquot_code);
        }
        element.aliquot_code = '';
      }
    }

    function selectAliquot(index) {

      if (index > -1) {
        _selectedLots.splice(index, 1);
        lot.isSelected = false;
      } else {
        _selectedLots.push(index);
        lot.isSelected = true;
      }
      _updateSelected(_selectedLots);
    }

    function _toastError(aliquotCode) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('aliquota ' + aliquotCode + ' não encontrada')
        .hideDelay(1000)
      );
    }

    function _toastDuplicated(aliquotCode) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('aliquota ' + aliquotCode + ' já esta no lote')
        .hideDelay(1000)
      );
    }

    function _toastOtherLot(aliquotCode) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('aliquota ' + aliquotCode + ' já esta em outro lote')
        .hideDelay(1000)
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
