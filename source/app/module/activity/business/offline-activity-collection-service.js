(function () {
  'use strict';

  angular
    .module('otusjs.activity.business')
    .service('otusjs.activity.business.OfflineActivityCollectionService', Service);

  Service.$inject = [
    '$q',
    'otusjs.deploy.OfflineActivityCollectionRestService'
  ];

  function Service($q, OfflineActivityCollectionRestService) {
    var self = this;

    self.getOfflineActivityCollections = getOfflineActivityCollections;
    self.synchronizeOfflineActivities = synchronizeOfflineActivities;

    function getOfflineActivityCollections() {
      let request = $q.defer();

      OfflineActivityCollectionRestService.getOfflineActivityCollections().then(response => {
        request.resolve(response.data.offlineActivityCollectionGroups);
      }).catch(error=>{
        request.reject(error);
      });

      return request.promise;
    }

    function synchronizeOfflineActivities(recruitmentNumber, offlineCollectionId) {
      return OfflineActivityCollectionRestService.synchronizeOfflineActivities(recruitmentNumber, offlineCollectionId);
    }
  }

}());
