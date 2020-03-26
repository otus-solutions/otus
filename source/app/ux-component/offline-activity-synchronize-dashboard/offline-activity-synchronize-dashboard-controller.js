(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('offlineActivitySynchronizeDashboardCtrl', Controller);

  Controller.$inject = [
    'otusjs.model.activity.OfflineActivityCollection',
    'otusjs.activity.business.OfflineActivityCollectionService'
  ];

  function Controller(OfflineActivityCollectionFactory, OfflineActivityCollectionService) {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.showInfo = showInfo;

    function onInit() {
      OfflineActivityCollectionService.getOfflineActivityCollections().then((result)=>{
        self.offlineActivityCollections = OfflineActivityCollectionFactory.fromArray(result);
      }).catch((error)=>{
      });
    }

    function showInfo(selectedCollection) {
      self.selectedCollection = selectedCollection;
      self.infoComponent.show();
    }
  }
}());
