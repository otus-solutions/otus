(function () {
  'use strict';

  angular
    .module('otusjs.participant.repository')
    .service('otusjs.participant.repository.ParticipantMonitoringCollectionService', Service);

  Service.$inject = [
    '$q',
    'otusjs.participant.core.ModuleService'
  ];

  function Service($q, ModuleService) {
    var self = this;
    var _remoteStorage = ModuleService.getParticipantMonitoringRemoteStorage();

    //Participant Report Methods
    self.getStatusOfActivities = getStatusOfActivities;
    self.updateObservation = updateObservation;

    function getStatusOfActivities(rn) {
      var request = $q.defer();
      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .list(rn)
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    }

    // TODO:
    function updateObservation(data) {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getReport(rn, id)
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    }
  }
}());
