(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusFlagReportDashboard', {
      controller: "otusFlagReportDashboardCtrl as $ctrl",
      templateUrl: 'app/ux-component/flag-report/otus-flag-report-dashboard-template.html'
    })
    .controller("otusFlagReportDashboardCtrl", Controller);

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
      if (ApplicationStateService.getCurrentState() == STATE.FLAG_DASHBOARD) {
        ApplicationStateService.activateFlagsReportManager();
      }
    }
  }

}());