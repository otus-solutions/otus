(function() {
  'use strict';

  angular
    .module('otusjs.deploy.rest')
    .service('otusjs.deploy.OfflineActivityCollectionRestService', Service);

  Service.$inject = [
    '$q',
    'OtusRestResourceService'
  ];

  function Service($q, OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.getOfflineActivityCollections = getOfflineActivityCollections;
    self.synchronizeOfflineActivities = synchronizeOfflineActivities;


    function initialize() {
      _rest = OtusRestResourceService.getOfflineActivityCollectionResourceFactory();
    }

    function getOfflineActivityCollections() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.fetchOfflineCollections().$promise;
    }

    function synchronizeOfflineActivities(recruitmentNumber, offlineCollectionId) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.synchronizeOfflineActivities({recruitmentNumber: recruitmentNumber, offlineCollectionId: offlineCollectionId}).$promise;
    }

  }
}());
