(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusUserCommentAboutParticipantDialogCtrl', Controller);

  Controller.$inject = [
    'otusjs.user.comment.business.UserCommentAboutParticipantService',
    'data'
  ]

  function Controller(UserCommentAboutParticipantService, data) {
    const self = this;

    self.cancelFillSelectedComment = cancelFillSelectedComment;
    self.showStarSelectedUserCommentAboutParticipant = showStarSelectedUserCommentAboutParticipant;
    self.saveUserCommentAboutParticipant = saveUserCommentAboutParticipant;
    self.getFormattedDate = getFormattedDate;
    self.colorStar = colorStar;
    self.iconStar = iconStar;

    //------------------------------ Data for dialog --------------------------------
    self.selectedComment = data;
    self.cancel = data.cancel;
    self.comment = data.comment;
    self.verify = data.verify;

    function cancelFillSelectedComment() {
      self.comment = "";
      self.selectedComment = null;
      self.cancel();
    }

    function _updateUserCommentAboutParticipant() {
      self.selectedComment.comment = self.comment;
      UserCommentAboutParticipantService.updateUserCommentAboutParticipant(self.selectedComment)
        .then(() => {
          cancelFillSelectedComment();
          UserCommentAboutParticipantService.showMsg('updateSuccessMessage');
        })
        .catch(() => {
          cancelFillSelectedComment();
          UserCommentAboutParticipantService.showMsg('failUserCommentAboutParticipantCreation');
        })
    }

    function saveUserCommentAboutParticipant() {
      if (self.selectedComment.comment) {
        _updateUserCommentAboutParticipant();
      } else {
        UserCommentAboutParticipantService.saveUserCommentAboutParticipant({ comment: self.comment, recruitmentNumber: self.selectedComment.recruitmentNumber })
          .then(() => {
            cancelFillSelectedComment();
            UserCommentAboutParticipantService.showMsg('successUserCommentAboutParticipantCreation');
          })
          .catch(() => {
            cancelFillSelectedComment();
            UserCommentAboutParticipantService.showMsg('failUserCommentAboutParticipantCreation');
          })
      }
    }

    function showStarSelectedUserCommentAboutParticipant(userCommentAboutParticipant) {
      let starred = !userCommentAboutParticipant.starred;
      UserCommentAboutParticipantService.showStarSelectedUserCommentAboutParticipant(userCommentAboutParticipant._id, starred)
        .then(() => {
          userCommentAboutParticipant.starred = starred;
          starred = null;
          UserCommentAboutParticipantService.showMsg('successMessage');
        })
        .catch(() => {
          UserCommentAboutParticipantService.showMsg('failureMessage');
        })
    }

    function getFormattedDate(date) {
      return UserCommentAboutParticipantService.getFormattedDate(date);
    }

    function colorStar(starSelected) {
      return UserCommentAboutParticipantService.colorStar(starSelected);
    }

    function iconStar(starSelected) {
      return UserCommentAboutParticipantService.iconStar(starSelected);
    }
  }
}());
