(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusReportDashboard', {
      controller: Controller,
      templateUrl: 'app/ux-component/report/dashboard/report-dashboard-template.html'
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
      //TODO: REVISAR
      // if (ApplicationStateService.getCurrentState() == STATE.REPORT_DASHBOARD) {
      //   if (ProjectContextService.getStateToGo() === STATE.REPORT_LOT_MANAGER_LIST) {
      //     ApplicationStateService.activateExamsLotsManagerList();
      //   } else if (ProjectContextService.getStateToGo() === STATE.REPORT_SENDING) {
      //     ApplicationStateService.activateExamSending();
      //   }
      // }
    }
  }
}());
