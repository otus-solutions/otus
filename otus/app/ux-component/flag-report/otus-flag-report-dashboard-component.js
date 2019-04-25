(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusFlagReportDashboard', {
      controller: "otusFlagReportDashboardCtrl as $ctrl",
      templateUrl: 'app/ux-component/flag-report/otus-flag-report-dashboard-template.html'
    });
}());
