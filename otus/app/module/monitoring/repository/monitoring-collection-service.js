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
    let _remoteStorage = ModuleService.getParticipantReportRemoteStorage();

    self.list = list;
    self.listAcronyms = listAcronyms;
    self.find = find;

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

    function listAcronyms(){
      var request = $q.defer();
      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .listAcronyms()
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function(e){
              request.reject(e);
            });
        });

      return request.promise;
    }

    function find(query) {
      var request = $q.defer();

      let localResponse = MonitoringLocalStorageService.find(query);
      if (localResponse.length){
        request.resolve(localResponse);
        return request.promise;
      }

      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .find(query.acronym)
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
