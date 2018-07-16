(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusExamLotAddButton', {
      controller: Controller,
      templateUrl: 'app/ux-component/exam/dashboard/exam-lot/aliquot-manager-list/add-button/lot-add-button-template.html'
    });

  Controller.$inject = [
    '$mdToast',
    'otusjs.laboratory.core.ContextService',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller($mdToast, laboratoryContextService, ApplicationStateService) {
    var self = this;
    var timeShowMsg = 3000;

    self.onNewLot = onNewLot;

    function onNewLot() {
      if(laboratoryContextService.getSelectedExamType() !== "ALL"){
        self.action = laboratoryContextService.setLotInfoManagerAction('create');
        ApplicationStateService.activateExamsLotInfoManager();
      } else {
        _toastError();
      }
    }

    function _toastError() {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Selecione um tipo de aliquota')
          .hideDelay(timeShowMsg)
      );
    }
  }
}());
