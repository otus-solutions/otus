(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusExamsLotsDashboard', {
      controller: Controller,
      templateUrl: 'app/ux-component/exams-lots/dashboard/exams-lots-dashboard-template.html'
    });

  Controller.$inject = [
    'STATE',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(STATE, ApplicationStateService) {
    var self = this;

    // lifecycle hooks
    self.$onInit = onInit;

    /* Public methods */
    function onInit() {
      if(ApplicationStateService.getCurrentState() === STATE.EXAMS_LOTS_DASHBOARD){
        ApplicationStateService.activateExamsLotsManagerList();
      }
    }
  }
}());
