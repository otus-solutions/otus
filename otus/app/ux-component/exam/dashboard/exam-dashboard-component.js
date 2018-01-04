(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusExamDashboard', {
      controller: Controller,
      templateUrl: 'app/ux-component/exam/dashboard/exam-dashboard-template.html'
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
      //TODO:
      /*
      if(ApplicationStateService.getCurrentState() === STATE.EXAM_DASHBOARD){
        ApplicationStateService.activateExamsLotsManagerList();
      }
      */
      if (ApplicationStateService.getCurrentState() === STATE.EXAM_DASHBOARD) {
        ApplicationStateService.activateExamSending();
      }
    }
  }
}());
