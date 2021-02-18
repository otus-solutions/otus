(function () {
  'use strict';

  angular
    .module('otusjs.user.comment.business')
    .service('otusjs.user.comment.business.UserCommentAboutParticipantService', Service);

  Service.$inject = [
    '$mdToast',
    'otusjs.user.comment.repository.UserCommentAboutParticipantRepositoryService',
    'otusjs.user.comment.business.UserCommentAboutParticipantValues',
    'otusjs.participant.core.ContextService',
  ];

  function Service($mdToast, UserCommentAboutParticipantRepositoryService, UserCommentAboutParticipantValues, CommentContextService) {
    const self = this;

    self.showMsg = showMsg;
    self.getNoteAboutParticipant = getNoteAboutParticipant;
    self.showStarSelectedUserCommentAboutParticipant = showStarSelectedUserCommentAboutParticipant;
    self.deleteSelectedComment = deleteSelectedComment;
    self.saveUserCommentAboutParticipant = saveUserCommentAboutParticipant;
    self.updateUserCommentAboutParticipant = updateUserCommentAboutParticipant;
    self.getFormattedDate = getFormattedDate;
    self.getSelectedParticipant = getSelectedParticipant;

    function getSelectedParticipant() {
      return CommentContextService.getSelectedParticipant();
    }

    function getNoteAboutParticipant(stuntmanSearchSettings) {
      return UserCommentAboutParticipantRepositoryService.getNoteAboutParticipant(stuntmanSearchSettings);
    }

    function showStarSelectedUserCommentAboutParticipant(commentId, starred) {
      return UserCommentAboutParticipantRepositoryService.showStarSelectedUserCommentAboutParticipant(commentId, starred);
    }

    function deleteSelectedComment(commentId) {
      return UserCommentAboutParticipantRepositoryService.deleteSelectedComment(commentId);
    }

    function saveUserCommentAboutParticipant(comment) {
      return UserCommentAboutParticipantRepositoryService.saveUserCommentAboutParticipant(comment);
    }

    function updateUserCommentAboutParticipant(comment) {
      return UserCommentAboutParticipantRepositoryService.updateUserCommentAboutParticipant(comment)
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
          .textContent(UserCommentAboutParticipantValues.toast[msg])
          .hideDelay(4000)
      );
    }
  }
}());
