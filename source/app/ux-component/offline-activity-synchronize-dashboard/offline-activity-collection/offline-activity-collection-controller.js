(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('offlineActivityCollectionCtrl', Controller);

  Controller.$inject = [
    'otusjs.activity.business.OfflineActivityCollectionService'
  ];

  function Controller(OfflineActivityCollectionService) {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.synchronizeOfflineActivities = synchronizeOfflineActivities;

    function onInit() {}

    function synchronizeOfflineActivities() {
      OfflineActivityCollectionService.synchronizeOfflineActivities(self.recruitmentNumber,self.offlineCollectionData._id).then(result => {
        self.reloadData();
      }).catch(error => {

      });
    }
  }
}());
