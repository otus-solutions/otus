(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.business.project.transportation')
    .service(
      'otusjs.laboratory.business.project.transportation.AliquotTransportationMessagesService',
      service);

  service.$inject = [
    '$mdToast'
  ];

  function service($mdToast) {
    var self = this;

    var timeShowMsg = 3000;
    self.toastNotFoundError = toastNotFoundError;
    self.toastDuplicated = toastDuplicated;
    self.toastWrongFieldCenter = toastWrongFieldCenter;
    self.toastOtherLot = toastOtherLot;
    self.unselectedPeriod = unselectedPeriod;
    self.invalidPeriodInterval = invalidPeriodInterval;
    self.successInAliquotInsertion = successInAliquotInsertion;
    self.notAliquotsInserted = notAliquotsInserted;
    self.notCodeAliquotsFound = notCodeAliquotsFound;


    function toastNotFoundError(aliquotCode) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('A alíquota "' + aliquotCode + '" não foi encontrada.')
        .hideDelay(timeShowMsg)
      );
    }

    function toastDuplicated(aliquotCode) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('A alíquota "' + aliquotCode + '" já esta no lote.')
        .hideDelay(timeShowMsg)
      );
    }

    function toastWrongFieldCenter(aliquotCode) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('A alíquota "' + aliquotCode + '" não pertence a este centro.')
        .hideDelay(timeShowMsg)
      );
    }

    function toastOtherLot(aliquotCode) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('A alíquota "' + aliquotCode + '" já esta em outro lote.')
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

    function notAliquotsInserted() {
      $mdToast.show(
        $mdToast.simple()
        .textContent('Nenhuma alíquota foi inserida.')
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

    return self;
  }
}());
