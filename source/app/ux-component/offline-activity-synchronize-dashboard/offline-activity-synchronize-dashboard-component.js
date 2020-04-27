(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('offlineActivitySynchronizeDashboard', {
      controller: "offlineActivitySynchronizeDashboardCtrl as $ctrl",
      templateUrl: 'app/ux-component/offline-activity-synchronize-dashboard/offline-activity-synchronize-dashboard-template.html'
    });

}());
