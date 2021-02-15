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

    self.getAllUsersComments = getAllUsersComments;
    self.showStarSelectedUserComment = showStarSelectedUserComment;
    self.deleteSelectedComment = deleteSelectedComment;
    self.saveUserComment = saveUserComment;
    self.updateUserComment = updateUserComment;

    function getAllUsersComments(limit, skip) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.getAllUsersComments(limit, skip))
        .then(response => response.data);
    }

    function showStarSelectedUserComment(commentId, starred) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.showStarSelectedUserComment(commentId, starred))
        .then(response => response.data);
    }

    function deleteSelectedComment(commentId) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.deleteSelectedComment(commentId))
        .then(response => response.data);
    }

    function saveUserComment(comment) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.saveUserComment(comment))
        .then(response => response.data);
    }

    function updateUserComment(commentId, comment) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.updateUserComment(commentId, comment))
        .then(response => response.data);
    }
  }
}());
