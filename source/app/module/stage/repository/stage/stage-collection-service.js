(function () {
  'use strict';

  angular
    .module('otusjs.stage.repository')
    .service('otusjs.stage.repository.StageCollectionService', Service);

  Service.$inject = [
    '$q',
    'otusjs.stage.core.ModuleService'
  ];

  function Service($q, ModuleService) {
    const self = this;
    let _remoteStorage = ModuleService.getRemoteStorage();

    self.getAllStages = getAllStages;


    function getAllStages() {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.getAllStages())
        .then(response => response.data);
    }

  }
}());