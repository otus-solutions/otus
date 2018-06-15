(function() {
  'use strict';

  angular
    .module('otusjs.monitoring.repository')
    .service('otusjs.monitoring.repository.MonitoringCollectionService', Service);

  Service.$inject = [
    '$q',
    'otusjs.monitoring.core.ModuleService',
    'otusjs.monitoring.storage.MonitoringLocalStorageService'
  ];

  function Service($q, ModuleService, MonitoringLocalStorageService) {
    var self = this;
    var _remoteStorage = ModuleService.getParticipantReportRemoteStorage();

    self.list = list;

    function list() {
      var request = $q.defer();
      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .list()
            .then(function (response) {
              MonitoringLocalStorageService.insert(response.data);
              request.resolve(response.data);
            })
            .catch(function(e){
              request.reject(e);
            });
        });

      return request.promise;
    }
  }
}());
