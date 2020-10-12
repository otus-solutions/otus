(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('laboratoryAliquotsManagerCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
  ];

  function Controller($mdToast) {
    var self = this;
    self.selectedTube = self.tube

    self.$onInit = onInit;


    function onInit() {
    }


    function toastError(tubeCode) {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Tubo ' + tubeCode + ' não encontrado')
          .hideDelay(1000)
      );
    }

    function toastDuplicated(tubeCode) {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Tubo ' + tubeCode + ' já coletado')
          .hideDelay(1000)
      );
    }
  }
}());
