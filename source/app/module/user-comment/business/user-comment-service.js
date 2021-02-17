(function () {
  'use strict';

  angular
    .module('otusjs.user.comment.business')
    .service('otusjs.user.comment.business.UserCommentService', Service);

  Service.$inject = [
    '$mdToast',
    'otusjs.user.comment.repository.UserCommentRepositoryService',
    'otusjs.user.comment.business.UserCommentValues',
    'otusjs.participant.core.ContextService',
  ];

  function Service($mdToast, UserCommentRepositoryService, UserCommentValues, CommentContextService) {
    const self = this;

    self.showMsg = showMsg;
    self.getNoteAboutParticipant = getNoteAboutParticipant;
    self.showStarSelectedUserComment = showStarSelectedUserComment;
    self.deleteSelectedComment = deleteSelectedComment;
    self.saveUserComment = saveUserComment;
    self.updateUserComment = updateUserComment;
    self.getFormattedDate = getFormattedDate;
    self.getSelectedParticipant = getSelectedParticipant;

    function getSelectedParticipant() {
      return CommentContextService.getSelectedParticipant();
    }

    function getNoteAboutParticipant(stuntmanSearchSettings) {
      return UserCommentRepositoryService.getNoteAboutParticipant(stuntmanSearchSettings);
    }

    function showStarSelectedUserComment(commentId, starred) {
      return UserCommentRepositoryService.showStarSelectedUserComment(commentId, starred);
    }

    function deleteSelectedComment(commentId) {
      return UserCommentRepositoryService.deleteSelectedComment(commentId);
    }

    function saveUserComment(comment) {
      return UserCommentRepositoryService.saveUserComment(comment);
    }

    function updateUserComment(comment) {
      return UserCommentRepositoryService.updateUserComment(comment)
    }

    function getFormattedDate(date) {
      try {
        let formattedDate = new Date(date);
        return formattedDate.getDate() + '/' + (formattedDate.getMonth() + 1) + '/' + formattedDate.getFullYear();
      } catch (e) {
        return "";
      }
    }

    function showMsg(msg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(UserCommentValues.toast[msg])
          .hideDelay(4000)
      );
    }
  }
}());
