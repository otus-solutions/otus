(function() {
  'use strict';

  angular
    .module('otusjs.report.repository')
    .service('otusjs.report.repository.ParticipantReportCollectionService', Service);

  Service.$inject = [
    'otusjs.report.core.ModuleService'
  ];

  function Service(ModuleService) {
    var self = this;
    var _remoteStorage = ModuleService.getParticipantReportRemoteStorage();

    //Participant Report Methods
    self.getParticipantReportList = getParticipantReportList;
    self.getFullReport = getFullReport;

    function getParticipantReportList(rn) {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .list(rn)
            .then(function (response) {
              request.resolve(response.data);
            });
        });

      return request.promise;
    }

    function getFullReport(rn, id) {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getReport(rn, id)
            .then(function (response) {
              request.resolve(response.data);
            });
        });

      return request.promise;
    }
  }
}());
