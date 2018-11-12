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
    self.getStatusOfSurveys = getStatusOfSurveys;
    self.defineSurveyWithUnnecessary = defineSurveyWithUnnecessary;

    function getStatusOfSurveys(rn) {
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

    function defineSurveyWithUnnecessary(data) {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .defineSurveyWithUnnecessary(data)
            .then(function (data) {
              request.resolve(data);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    }
  }
}());
