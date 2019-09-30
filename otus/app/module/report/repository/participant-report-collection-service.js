(function() {
  'use strict';

  angular
    .module('otusjs.report.repository')
    .service('otusjs.report.repository.ParticipantReportCollectionService', Service);

  Service.$inject = [
    '$q',
    'otusjs.report.core.ModuleService'
  ];

  function Service($q, ModuleService) {
    var self = this;
    var _remoteStorage = ModuleService.getParticipantReportRemoteStorage();

    //Participant Report Methods
    self.getParticipantReportList = getParticipantReportList;
    self.getFullReport = getFullReport;
    self.getActivityReport = getActivityReport;

    function getParticipantReportList(rn) {
      var request = $q.defer();
      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .list(rn)
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function(e){
              request.reject(e);
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
            })
            .catch(function(e){
              request.reject(e);
            });
        });
      return request.promise;
    }

    function getActivityReport(id){
      var request = $q.defer();
      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getActivityReport(id)
            //.list(5001007, id)
            .then(function (response) {
              //request.resolve(response.data[0]);
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
