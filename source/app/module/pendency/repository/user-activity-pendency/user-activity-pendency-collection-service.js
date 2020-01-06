(function () {
  'use strict'

  angular
    .module('otusjs.pendency.repository')
    .service('otusjs.pendency.repository.UserActivityPendencyCollectionService', Service);

  Service.$inject = [
    '$q',
    'otusjs.pendency.core.ModuleService'

  ];

  function Service($q, ModuleService) {
    const self = this;
    let _remoteStorage = ModuleService.getUserActivityPendencyRemoteStorage();

    self.createUserActivityPendency = createUserActivityPendency;
    self.getPendencyByActivityId = getPendencyByActivityId;
    self.updateUserActivityPendency = updateUserActivityPendency;
    self.deleteUserActivityPendency = deleteUserActivityPendency;

    function createUserActivityPendency(userActivityPendency) {
      let request = $q.defer();
      _remoteStorage.whenReady()
        .then(remoteStorage => {
          return remoteStorage.createUserActivityPendency(userActivityPendency.toJSON())
            .then(response => {
              request.resolve(response.data);
            })
            .catch( e => request.reject(e));
        });
      return request.promise;
    }


    function getPendencyByActivityId(id) {
      let request = $q.defer();
      _remoteStorage.whenReady()
        .then(remoteStorage => {
          return remoteStorage.getPendencyByActivityId(id)
            .then(response => {
              request.resolve(response.data);
            })
            .catch( e => request.reject(e));
        });
      return request.promise;
    }


    function updateUserActivityPendency(foundPendencyId, updatedPendency) {
      let request = $q.defer();
      _remoteStorage.whenReady()
        .then(remoteStorage => {
          return remoteStorage.updateUserActivityPendency(foundPendencyId, updatedPendency.toJSON())
            .then(response => {
              request.resolve(response.data);
            })
            .catch( e => request.reject(e));
        });
      return request.promise;
    }

    function deleteUserActivityPendency(foundPendencyId) {
      let request = $q.defer();
      _remoteStorage.whenReady()
        .then(remoteStorage => {
          return remoteStorage.deleteUserActivityPendency(foundPendencyId)
            .then(response => {
              request.resolve(response.data);
            })
            .catch( e => request.reject(e));
        });
      return request.promise;
    }

  }

}());