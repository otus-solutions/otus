(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusExamLotAddButton', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/manager-list/lot-add-button/lot-add-button-template.html',
    });

  Controller.$inject = [
    'otusjs.laboratory.core.ContextService',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(laboratoryContextService, ApplicationStateService) {
    var self = this;

    self.onNewLot = onNewLot;

    function onNewLot() {
      self.action = laboratoryContextService.setLotInfoManagerAction('create');
      ApplicationStateService.activateExamsLotInfoManager();
    }
  }
}());
