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
    'otusjs.application.state.ApplicationStateService',
    'otusjs.laboratory.core.project.ContextService'
  ];

  function Controller(STATE, ApplicationStateService, ProjectContextService) {
    var self = this;

    // lifecycle hooks
    self.$onInit = onInit;

    /* Public methods */
    function onInit() {
      //TODO:
      if(ApplicationStateService.getCurrentState() == STATE.EXAM_DASHBOARD) {
        if (ProjectContextService.getStateToGo() === STATE.EXAM_LOT_MANAGER_LIST) {
          ApplicationStateService.activateExamsLotsManagerList();
        } else if (ProjectContextService.getStateToGo() === STATE.EXAM_SENDING) {
          ApplicationStateService.activateExamSending();
        }
      }
    }
  }
}());
