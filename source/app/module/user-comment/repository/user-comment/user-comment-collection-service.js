(function () {
  'use strict';

  angular
    .module('otusjs.user.comment.repository')
    .service('otusjs.user.comment.repository.UserCommentCollectionService', Service);

  Service.$inject = [
    'otusjs.user.comment.core.ModuleService'
  ];

  function Service(ModuleService) {
    const self = this;
    let _remoteStorage = ModuleService.getUserCommentRemoteStorage();

    self.getAllUserComments = getAllUserComments;

    function getAllUserComments() {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.getAllUserComments())
        .then(response => response.data);
    }

  }
}());
