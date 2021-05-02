(function () {
  'use strict';

  angular
    .module('otusjs.user.comment.business')
    .service('otusjs.user.comment.business.UserCommentAboutParticipantService', Service);

  Service.$inject = [
    '$mdToast',
    'otusjs.user.comment.repository.UserCommentAboutParticipantRepositoryService',
    'otusjs.user.comment.business.UserCommentAboutParticipantValues'
  ];

  function Service($mdToast, UserCommentAboutParticipantRepositoryService, UserCommentAboutParticipantValues, CommentContextService) {
    const self = this;
    const STAR_COLOR = 'rgb(253, 204, 13)';

    self.showMsg = showMsg;
    self.getNoteAboutParticipant = getNoteAboutParticipant;
    self.getDashboardComments = getDashboardComments;
    self.showStarSelectedUserCommentAboutParticipant = showStarSelectedUserCommentAboutParticipant;
    self.deleteSelectedComment = deleteSelectedComment;
    self.saveUserCommentAboutParticipant = saveUserCommentAboutParticipant;
    self.updateUserCommentAboutParticipant = updateUserCommentAboutParticipant;
    self.getFormattedDate = getFormattedDate;
    self.colorStar = colorStar;
    self.iconStar = iconStar;

    async function getDashboardComments(recruitmentNumber, quantity) {
      let starredFilters = {
        quantityToGet: quantity,
        currentQuantity: 0,
        filters: {
          starred: true
        },
        recruitmentNumber: recruitmentNumber
      }

      let starred = await getNoteAboutParticipant(starredFilters)

      if (starred === quantity) {
        return starred
      }

      let notStarredFilters = {
        quantityToGet: quantity - starred.length,
        currentQuantity: 0,
        filters: {
          starred: false
        },
        recruitmentNumber: recruitmentNumber
      }

      let notStarred = await getNoteAboutParticipant(notStarredFilters);
      return starred.concat(notStarred);
    }

    function getNoteAboutParticipant(searchSettings) {
      return UserCommentAboutParticipantRepositoryService.getNoteAboutParticipant(searchSettings);
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

    function colorStar(starSelected) {
      return starSelected ? {color: STAR_COLOR} : null;
    }

    function iconStar(starSelected) {
      return starSelected ? "star_rate" : "star_outline";
    }
  }
}());
