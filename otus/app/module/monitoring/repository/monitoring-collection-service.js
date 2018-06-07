(function() {
  'use strict';

  angular
    .module('otusjs.monitoring.repository')
    .service('otusjs.monitoring.repository.MonitoringCollectionService', Service);

  Service.$inject = [
    '$q',
    'otusjs.monitoring.core.ModuleService'
  ];

  function Service($q, ModuleService) {
    var self = this;
    var _remoteStorage = ModuleService.getParticipantReportRemoteStorage();

    //Participant Report Methods
    self.list = list;

    function list() {
      var request = $q.defer();
      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .list()
            .then(function (response) {
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
