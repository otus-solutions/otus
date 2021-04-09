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
    self.updateUserCommentAboutParticipant = updateUserCommentAboutParticipant;
    self.showStarSelectedUserCommentAboutParticipant = showStarSelectedUserCommentAboutParticipant;
    self.getFormattedDate = getFormattedDate;
    self.colorStar = colorStar;
    self.iconStar = iconStar;

//------------------------------ Data for dialog --------------------------------
    self.item = data;
    self.cancel = data.cancel;
    self.comment = data.comment;
    self.verify = data.verify;
    self.loadNoteAboutParticipantDashboard = data._loadNoteAboutParticipantDashboard;


    function cancelFillSelectedComment() {
      self.comment = "";
      self.selectedComment = null;
      self.cancel();
    }

    function updateUserCommentAboutParticipant(selectedParticipant) {
      console.log(selectedParticipant)
      selectedParticipant.comment = self.comment;
      UserCommentAboutParticipantService.updateUserCommentAboutParticipant(selectedParticipant)
        .then(() => {
          self.cancel();
          UserCommentAboutParticipantService.showMsg('updateSuccessMessage');
          self.comment = "";
          self.loadNoteAboutParticipantDashboard();
        })
        .catch(() => {
          self.cancel();
          UserCommentAboutParticipantService.showMsg('failUserCommentAboutParticipantCreation');
        })
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
