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
    self.loadOfflineCollections = loadOfflineCollections;

    function onInit() {
      loadOfflineCollections();
    }

    function loadOfflineCollections() {
      OfflineActivityCollectionService.getOfflineActivityCollections().then((result)=>{
        self.offlineActivityCollections = OfflineActivityCollectionFactory.fromArray(result);
      }).catch((error)=>{
        self.offlineActivityCollections = [];
      });
    }

    function showInfo(selectedCollection) {
      self.selectedCollection = selectedCollection;
      self.infoComponent.show();
    }
  }
}());
