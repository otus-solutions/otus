(function () {
  'use strict';

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
    self.getAllUserActivityPendenciesToReceiver = getAllUserActivityPendenciesToReceiver;
    self.getOpenedUserActivityPendenciesToReceiver = getOpenedUserActivityPendenciesToReceiver;
    self.getDoneUserActivityPendenciesToReceiver = getDoneUserActivityPendenciesToReceiver;
    self.getAllPendencies = getAllPendencies;

    function createUserActivityPendency(userActivityPendency) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.createUserActivityPendency(userActivityPendency.toJSON()))
        .then(response => response.data);
    }

    function getPendencyByActivityId(id) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.getPendencyByActivityId(id))
        .then(response => response.data);
    }

    function updateUserActivityPendency(foundPendencyId, updatedPendency) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.updateUserActivityPendency(foundPendencyId, updatedPendency.toJSON()))
        .then(response => response.data);
    }

    function deleteUserActivityPendency(foundPendencyId) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.deleteUserActivityPendency(foundPendencyId))
        .then(response => response.data);
    }

    function getAllUserActivityPendenciesToReceiver() {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.getAllUserActivityPendenciesToReceiver())
        .then(response => response.data);
    }

    function getOpenedUserActivityPendenciesToReceiver() {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.getOpenedUserActivityPendenciesToReceiver())
        .then(response => response.data);
    }

    function getDoneUserActivityPendenciesToReceiver() {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.getDoneUserActivityPendenciesToReceiver())
        .then(response => response.data);
    }

    function getAllPendencies(searchSettings) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.getAllPendencies(searchSettings))
        .then(response => response.data);
    }

  }
}());