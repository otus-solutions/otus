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

    function getParticipantReportList() {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getParticipantReportList()
            .then(function (list) {
              request.resolve(list);
            });
        });

      return request.promise;
    }
  }
}());
