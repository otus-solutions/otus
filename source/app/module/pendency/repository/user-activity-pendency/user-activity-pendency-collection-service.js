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

    self.saveUserActivityPendency = saveUserActivityPendency;

    function saveUserActivityPendency(userActivityPendency) {
      let request = $q.defer();
      _remoteStorage.whenReady()
        .then(remoteStorage => {
          return remoteStorage.create(userActivityPendency.toJSON())
            .then(response => {
              request.resolve(response.data);
            })
            .catch( e => request.reject(e));
        });
      return request.promise;
    }
  }

}());