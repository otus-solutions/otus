(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusExamLotDashboard', {
      controller: Controller,
      templateUrl: 'app/ux-component/exams-lots/dashboard/exam-lot-dashboard-template.html'
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
      if(ApplicationStateService.getCurrentState() === STATE.EXAM_LOT_DASHBOARD){
        ApplicationStateService.activateExamsLotsManagerList();
      }
    }
  }
}());
