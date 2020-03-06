(function () {
  'use strict';

  angular
    .module('otusjs.laboratory.business.project.transportation')
    .service(
      'otusjs.laboratory.business.project.transportation.MaterialTransportationMessagesService',
      service);

  service.$inject = [
    '$mdToast'
  ];

  function service($mdToast) {
    var self = this;

    const timeShowMsg = 3000;
    self.toastNotFoundError = toastNotFoundError;
    self.toastDuplicated = toastDuplicated;
    self.toastWrongFieldCenter = toastWrongFieldCenter;
    self.toastOtherLot = toastOtherLot;
    self.unselectedPeriod = unselectedPeriod;
    self.invalidPeriodInterval = invalidPeriodInterval;
    self.successInAliquotInsertion = successInAliquotInsertion;
    self.successInTubeInsertion = successInTubeInsertion;
    self.notMaterialInsert = notMaterialInsert;
    self.notCodeAliquotsFound = notCodeAliquotsFound;

    var _notFoundLocation = new RegExp(/is not in transportation lot origin location point/g);
    var _aliquotNotFound = new RegExp(/Aliquot not found/g);
    var _tubeNotFound = new RegExp(/Tube not found/g);
    var _tubeNotCollected = new RegExp(/Tube is not collected/g);


    function toastNotFoundError(code) {
      _show('O material "' + code + '" não foi encontrada.');
    }

    function toastDuplicated(code) {
      _show('O material "' + code + '" já esta no lote.');
    }

    function toastWrongFieldCenter(code) {
      _show('O material "' + code + '" não pertence a este centro.');
    }

    function toastOtherLot(code) {
      _show('O material "' + code + '" já esta em outro lote.');
    }

    function unselectedPeriod() {
      _show('Por favor, selecione o Período Inicial e o Período Final antes de prosseguir.');
    }

    function invalidPeriodInterval() {
      _show('O Início do Período, não pode ser superior ao Final do Período.');
    }

    function successInAliquotInsertion() {
      _show('A(s) alíquota(s) foi(ram) inserida(s) com sucesso.');
    }

    function successInTubeInsertion() {
      _show('O tubo foi inserido com sucesso.');
    }

    function notMaterialInsert() {
      _show('Nenhum material foi inserido.');
    }

    function notCodeAliquotsFound() {
      _show('Nenhum código foi informado.');
    }

    self.messageError = function (message) {
      if (_tubeNotFound.test(message) || _aliquotNotFound.test(message)) {
        _show('O material não foi encontrado.');
      } else if (_notFoundLocation.test(message)) {
        _show('O material não está na localização de origem.');
      } else if (_tubeNotCollected.test(message)) {
        _show('O material não foi coletado.');
      }
    };

    function _show(txt) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(txt)
          .hideDelay(timeShowMsg)
      );
    }

    return self;
  }
}());
