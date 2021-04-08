(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('userCommentAboutParticipantController', Controller);

  Controller.$inject = [
    'otusjs.user.comment.business.UserCommentAboutParticipantService',
    'data'
  ]

  function Controller(UserCommentAboutParticipantService, data) {
    const self = this;

    self.item = data;
    self.cancel = data.cancel;
    self.comment = data.comment;
    self.verify = data.verify;

    console.log(self)
    self.cancelFillSelectedComment = cancelFillSelectedComment;
    self.saveUserCommentAboutParticipant = saveUserCommentAboutParticipant;
    self.showStarSelectedUserCommentAboutParticipant = showStarSelectedUserCommentAboutParticipant;
    self.getFormattedDate = getFormattedDate;
    self.colorStar = colorStar;
    self.iconStar = iconStar;

    function cancelFillSelectedComment() {
      self.comment = "";
      self.selectedComment = null;
    }

    function saveUserCommentAboutParticipant(selectedParticipant) {

      UserCommentAboutParticipantService.saveUserCommentAboutParticipant({ comment: self.comment, recruitmentNumber: selectedParticipant.recruitmentNumber })
        .then(() => {
          UserCommentAboutParticipantService.showMsg('successUserCommentAboutParticipantCreation');
          self.comment = "";
          // _loadNoteAboutParticipantDashboard(); // TODO implement loading on list
        })
        .catch(() => {
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
