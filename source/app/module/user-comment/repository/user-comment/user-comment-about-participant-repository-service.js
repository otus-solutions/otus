(function () {
  'use strict';

  angular
    .module('otusjs.user.comment.repository')
    .service('otusjs.user.comment.repository.UserCommentAboutParticipantRepositoryService', Service);

  Service.$inject = [
    'otusjs.user.comment.repository.UserCommentAboutParticipantCollectionService'
  ];

  function Service(UserCommentAboutParticipantCollectionService) {
    const self = this;

    self.getNoteAboutParticipant = getNoteAboutParticipant;
    self.showStarSelectedUserCommentAboutParticipant = showStarSelectedUserCommentAboutParticipant;
    self.deleteSelectedComment = deleteSelectedComment;
    self.saveUserCommentAboutParticipant = saveUserCommentAboutParticipant;
    self.updateUserCommentAboutParticipant = updateUserCommentAboutParticipant;

    function getNoteAboutParticipant(stuntmanSearchSettings) {
      return UserCommentAboutParticipantCollectionService.getAllUsersComments(stuntmanSearchSettings);
    }

    function showStarSelectedUserCommentAboutParticipant(commentId, starred) {
      return UserCommentAboutParticipantCollectionService.showStarSelectedUserCommentAboutParticipant(commentId, starred);
    }

    function deleteSelectedComment(commentId) {
      return UserCommentAboutParticipantCollectionService.deleteSelectedComment(commentId);
    }

    function saveUserCommentAboutParticipant(comment) {
      return UserCommentAboutParticipantCollectionService.saveUserCommentAboutParticipant(comment);
    }

    function updateUserCommentAboutParticipant(comment) {
      return UserCommentAboutParticipantCollectionService.updateUserCommentAboutParticipant(comment)
    }
  }
}());
