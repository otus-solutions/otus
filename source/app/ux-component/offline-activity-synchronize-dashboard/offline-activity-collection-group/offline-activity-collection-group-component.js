(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('offlineActivityCollectionGroup', {
      controller: "offlineActivityCollectionGroupCtrl as $ctrl",
      templateUrl: 'app/ux-component/offline-activity-synchronize-dashboard/offline-activity-collection-group/offline-activity-collection-group-template.html',
      bindings: {
        offlineCollectionGroupData: '<',
        reloadData: '&'
      }
    });

}());
