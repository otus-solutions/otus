(function () {
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
    let _remoteStorage = ModuleService.getMonitoringRemoteStorage();

    self.listAcronyms = listAcronyms;
    self.listCenters = listCenters;
    self.find = find;

    function listAcronyms() {
      var request = $q.defer();
      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .listAcronyms()
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    }

    function listCenters() {
      var request = $q.defer();
      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .listCenters()
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    }

    function find(query) {
      var request = $q.defer();

      let localResponse = MonitoringLocalStorageService.find(query);
      if (localResponse.length) {
        request.resolve([].concat(localResponse));
        console.log('local storage request', [].concat(localResponse));
        return request.promise;
      }

      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .find(query.acronym)
            .then(function (response) {
              if (response.data) {
                let inserted = MonitoringLocalStorageService.insert(response.data);
                console.log('remote request', [].concat(inserted));
                request.resolve([].concat(inserted));
              }
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    }
  }
}());
