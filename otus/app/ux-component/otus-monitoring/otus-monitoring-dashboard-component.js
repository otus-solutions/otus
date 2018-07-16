(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusMonitoringDashboard', {
      controller: "otusMonitoringDashboardCtrl as $ctrl",
      templateUrl: 'app/ux-component/otus-monitoring/otus-monitoring-dashboard-template.html'
    });

}());
