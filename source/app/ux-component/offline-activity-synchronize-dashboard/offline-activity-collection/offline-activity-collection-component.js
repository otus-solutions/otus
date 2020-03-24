(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('offlineActivityCollection', {
      controller: "offlineActivityCollectionCtrl as $ctrl",
      templateUrl: 'app/ux-component/offline-activity-synchronize-dashboard/offline-activity-collection/offline-activity-collection-template.html',
      bindings: {
        offlineCollectionData: '<',
        showInfo: '&'
      }
    });

}());
