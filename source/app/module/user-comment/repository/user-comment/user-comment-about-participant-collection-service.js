(function () {
  'use strict';

  angular
    .module('otusjs.user.comment.repository')
    .service('otusjs.user.comment.repository.UserCommentAboutParticipantCollectionService', Service);

  Service.$inject = [
    'otusjs.user.comment.core.ModuleService'
  ];

  function Service(ModuleService) {
    const self = this;
    let _remoteStorage = ModuleService.getUserCommentAboutParticipantRemoteStorage();

    self.getAllUsersComments = getAllUsersComments;
    self.showStarSelectedUserCommentAboutParticipant = showStarSelectedUserCommentAboutParticipant;
    self.deleteSelectedComment = deleteSelectedComment;
    self.saveUserCommentAboutParticipant = saveUserCommentAboutParticipant;
    self.updateUserCommentAboutParticipant = updateUserCommentAboutParticipant;

    function getAllUsersComments(stuntmanSearchSettings) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.getAllUsersComments(stuntmanSearchSettings))
        .then(response => response.data);
    }

    function showStarSelectedUserCommentAboutParticipant(commentId, starred) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.showStarSelectedUserCommentAboutParticipant(commentId, starred))
        .then(response => response.data);
    }

    function deleteSelectedComment(commentId) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.deleteSelectedComment(commentId))
        .then(response => response.data);
    }

    function saveUserCommentAboutParticipant(comment) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.saveUserCommentAboutParticipant(comment))
        .then(response => response.data);
    }

    function updateUserCommentAboutParticipant(comment) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.updateUserCommentAboutParticipant(comment))
        .then(response => response.data);
    }
  }
}());
