(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusUserCommentAboutParticipantList', {
      controller: 'otusUserCommentAboutParticipantListCtrl as $ctrl',
      templateUrl: 'app/ux-component/user-comment/user-comment-about-participant-list-template.html'
    }).controller('otusUserCommentAboutParticipantListCtrl', Controller);

  Controller.$inject = [
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.otus.dashboard.service.DashboardService',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.user.comment.business.UserCommentAboutParticipantService',
    'USER_COMMENT_MANAGER_LABELS'
  ];

  function Controller(DashboardEventService, DashboardService, DialogService, UserCommentAboutParticipantService, USER_COMMENT_MANAGER_LABELS) {
    const DIALOG_CONTROLLER = 'otusUserCommentAboutParticipantDialogCtrl';
    const DIRECTORY_DIALOG_CONTROLLER = 'app/ux-component/user-comment/user-comment-about-participant-dialog/user-comment-about-participant-dialog-template.html';

    var self = this;

    let stuntmanSearchSettings = {};

    /* Public methods */
    self.cancelFillSelectedComment = cancelFillSelectedComment;
    self.deleteSelectedComment = deleteSelectedComment;
    self.showStarSelectedUserCommentAboutParticipant = showStarSelectedUserCommentAboutParticipant;
    self.saveUserCommentAboutParticipant = saveUserCommentAboutParticipant;
    self.updateUserCommentAboutParticipant = updateUserCommentAboutParticipant;
    self.colorStar = colorStar;
    self.iconStar = iconStar;
    self.getFormattedDate = getFormattedDate;
    self.openMenu = openMenu;

    self.$onInit = onInit;

    self.items = [];
    self.selectedComment = null;
    self.selectedParticipant = null;
    self.paginatorActive = true;

    function onInit() {
      _loadSelectedParticipant();
      DashboardEventService.onParticipantSelected(_loadSelectedParticipant);
    }

    function openMenu($mdMenu, ev) {
      $mdMenu.open(ev);
    };

    function _loadSelectedParticipant(participantData) {
      if (participantData) {
        self.selectedParticipant = participantData;
        self.isEmpty = false;
        _loadNoteAboutParticipant();
      } else {
        DashboardService
          .getSelectedParticipant()
          .then(function (participantData) {
            if (participantData) {
              self.selectedParticipant = participantData;
              self.isEmpty = false;
              _loadNoteAboutParticipant();
            }
          });
      }
    }

    function _loadNoteAboutParticipant() {
      stuntmanSearchSettings = {
        recruitmentNumber: self.selectedParticipant.recruitmentNumber
      }

      UserCommentAboutParticipantService.getNoteAboutParticipant(stuntmanSearchSettings).then((arrayComment) => {
        self.items = arrayComment
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

    function colorStar(starSelected) {
      return UserCommentAboutParticipantService.colorStar(starSelected);
    }

    function iconStar(starSelected) {
      return UserCommentAboutParticipantService.iconStar(starSelected);
    }

    function getFormattedDate(date) {
      return UserCommentAboutParticipantService.getFormattedDate(date);
    }

    function updateUserCommentAboutParticipant(selectedComment) {
      selectedComment.verify = false;
      selectedComment.dialog = USER_COMMENT_MANAGER_LABELS.ATTRIBUTES_MESSAGE.editComment;
      DialogService.showCustomizedDialog(selectedComment, DIALOG_CONTROLLER, DIRECTORY_DIALOG_CONTROLLER, true)
        .then(() => _loadNoteAboutParticipant())
        .catch(() => _loadNoteAboutParticipant());
    }

    function saveUserCommentAboutParticipant() {
      UserCommentAboutParticipantService.saveUserCommentAboutParticipant({ comment: self.comment, recruitmentNumber: self.selectedParticipant.recruitmentNumber })
        .then(() => {
          UserCommentAboutParticipantService.showMsg('successUserCommentAboutParticipantCreation');
          self.comment = "";
          _loadNoteAboutParticipant();
        })
        .catch(() => {
          UserCommentAboutParticipantService.showMsg('failUserCommentAboutParticipantCreation');
        })
    }

    function cancelFillSelectedComment() {
      self.comment = "";
      self.selectedComment = null;
    }

    function deleteSelectedComment(commentId) {
      DialogService.showDialog(USER_COMMENT_MANAGER_LABELS.ATTRIBUTES_MESSAGE.deleteUserCommentAboutParticipant)
        .then(function () {
          UserCommentAboutParticipantService.deleteSelectedComment(commentId)
            .then(() => {
              UserCommentAboutParticipantService.showMsg('deleteSuccessMessage');
              _loadNoteAboutParticipant();
            })
            .catch(() => {
              UserCommentAboutParticipantService.showMsg('failureMessage');
            })
        });
    }
  }
}());
