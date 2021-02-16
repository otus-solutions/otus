(function () {
  'use strict';

  angular
    .module('otusjs.user.comment.repository')
    .service('otusjs.user.comment.repository.UserCommentRepositoryService', Service);

  Service.$inject = [
    'otusjs.user.comment.repository.UserCommentCollectionService'
  ];

  function Service(UserCommentCollectionService) {
    const self = this;

    self.getNoteAboutParticipant = getNoteAboutParticipant;
    self.showStarSelectedUserComment = showStarSelectedUserComment;
    self.deleteSelectedComment = deleteSelectedComment;
    self.saveUserComment = saveUserComment;
    self.updateUserComment = updateUserComment;

    function getNoteAboutParticipant(stuntmanSearchSettings) {
      return UserCommentCollectionService.getAllUsersComments(stuntmanSearchSettings);
    }

    function showStarSelectedUserComment(commentId, starred) {
      return UserCommentCollectionService.showStarSelectedUserComment(commentId, starred);
    }

    function deleteSelectedComment(commentId) {
      return UserCommentCollectionService.deleteSelectedComment(commentId);
    }

    function saveUserComment(comment) {
      return UserCommentCollectionService.saveUserComment(comment);
    }

    function updateUserComment(comment) {
      return UserCommentCollectionService.updateUserComment(comment)
    }
  }
}());
