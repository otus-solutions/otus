(function() {
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


    function toastNotFoundError(code) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('O material "' + code + '" não foi encontrada.')
        .hideDelay(timeShowMsg)
      );
    }

    function toastDuplicated(code) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('O material "' + code + '" já esta no lote.')
        .hideDelay(timeShowMsg)
      );
    }

    function toastWrongFieldCenter(code) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('O material "' + code + '" não pertence a este centro.')
        .hideDelay(timeShowMsg)
      );
    }

    function toastOtherLot(code) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('O material "' + code + '" já esta em outro lote.')
        .hideDelay(timeShowMsg)
      );
    }

    function unselectedPeriod() {
      $mdToast.show(
        $mdToast.simple()
        .textContent('Por favor, selecione o Período Inicial e o Período Final antes de prosseguir.')
        .hideDelay(timeShowMsg)
      );
    }

    function invalidPeriodInterval() {
      $mdToast.show(
        $mdToast.simple()
        .textContent('O Início do Período, não pode ser superior ao Final do Período.')
        .hideDelay(timeShowMsg)
      );
    }

    function successInAliquotInsertion() {
      $mdToast.show(
        $mdToast.simple()
        .textContent('A(s) alíquota(s) foi(ram) inserida(s) com sucesso.')
        .hideDelay(timeShowMsg)
      );
    }

    function successInTubeInsertion() {
      $mdToast.show(
        $mdToast.simple()
        .textContent('O tubo foi inserido com sucesso.')
        .hideDelay(timeShowMsg)
      );
    }

    function notMaterialInsert() {
      $mdToast.show(
        $mdToast.simple()
        .textContent('Nenhum material foi inserido.')
        .hideDelay(timeShowMsg)
      );
    }

    function notCodeAliquotsFound() {
      $mdToast.show(
        $mdToast.simple()
        .textContent('Nenhum código foi informado.')
        .hideDelay(timeShowMsg)
      );
    }

    self.messageError = function (message) {
      var _notFound = new RegExp(/origin location not found/g);
      var _aliquotNotFound = new RegExp(/Aliquot not found/g);
      var _otherLocation = new RegExp(/is not in transportation lot origin location point/g);
      if (_notFound.test(message) || _aliquotNotFound.test(message)) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('O material não foi encontrado.')
            .hideDelay(timeShowMsg)
        );
        return;
      }
      if (_otherLocation.test(message)){
        $mdToast.show(
          $mdToast.simple()
            .textContent('O material está em outro lote')
            .hideDelay(timeShowMsg)
        );
        return;
      }
    };

    return self;
  }
}());
