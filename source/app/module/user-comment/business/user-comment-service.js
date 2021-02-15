(function () {
  'use strict';

  angular
    .module('otusjs.user.comment.business')
    .service('otusjs.user.comment.business.UserCommentService', Service);

  Service.$inject = [
    '$mdToast',
    'otusjs.user.comment.repository.UserCommentRepositoryService',
    'otusjs.user.comment.business.UserCommentValues'
  ];

  function Service($mdToast, UserCommentRepositoryService, UserCommentValues) {
    const self = this;

    self.showMsg = showMsg;
    self.getNoteAboutParticipant = getNoteAboutParticipant;
    self.showStarSelectedUserComment = showStarSelectedUserComment;
    self.deleteSelectedComment = deleteSelectedComment;
    self.saveUserComment = saveUserComment;
    self.updateUserComment = updateUserComment;
    self.getFormattedDate = getFormattedDate;

    function getNoteAboutParticipant() {
      return UserCommentRepositoryService.getNoteAboutParticipant();
    }

    function showStarSelectedUserComment(commentId) {
      return UserCommentRepositoryService.showStarSelectedUserComment(commentId);
    }

    function deleteSelectedComment(commentId) {
      return UserCommentRepositoryService.deleteSelectedComment(commentId);
    }

    function  saveUserComment(comment) {
      return UserCommentRepositoryService.saveUserComment(comment);
    }

    function updateUserComment(commentId, comment) {
      return UserCommentRepositoryService.updateUserComment(commentId, comment)
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
