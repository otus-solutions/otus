(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusFlagReportListManager', {
      controller: "otusFlagReportListManagerCtrl as $ctrl",
      templateUrl: 'app/ux-component/flag-report/activity-flag-report/list-manager/otus-flag-report-list-manager-template.html'
    });
}());
