(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusLaboratoryMonitoringDashboard', {
      controller: "otusLaboratoryMonitoringDashboardCtrl as $ctrl",
      templateUrl: 'app/ux-component/otus-monitoring/laboratory-monitoring/laboratory-monitoring-template.html'
    });
}());
