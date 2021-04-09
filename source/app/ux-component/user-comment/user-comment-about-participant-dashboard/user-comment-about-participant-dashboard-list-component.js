(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusUserCommentAboutParticipantDashboardList', {
      controller: 'otusUserCommentAboutParticipantDashboardListCtrl as $ctrl',
      templateUrl: 'app/ux-component/user-comment/user-comment-about-participant-dashboard/user-comment-about-participant-dashboard-list-template.html',
      bindings: {
        participant: '<'
      }
    }).controller('otusUserCommentAboutParticipantDashboardListCtrl', Controller);

  Controller.$inject = [
    '$element',
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.otus.dashboard.service.DashboardService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.user.comment.business.UserCommentAboutParticipantService',
    'USER_COMMENT_MANAGER_LABELS'
  ];

  function Controller(
    $element,
    DashboardEventService,
    DashboardService,
    ApplicationStateService,
    DialogService,
    UserCommentAboutParticipantService,
    USER_COMMENT_MANAGER_LABELS) {
    const LIMIT = 3;
    const SKIP = 0;

    var self = this;

    /* Public methods */
    self.fillSelectedComment = fillSelectedComment;
    self.cancelFillSelectedComment = cancelFillSelectedComment;
    self.deleteSelectedComment = deleteSelectedComment;
    self.showStarSelectedUserCommentAboutParticipant = showStarSelectedUserCommentAboutParticipant;
    self.saveUserCommentAboutParticipant = saveUserCommentAboutParticipant;
    self.colorStar = colorStar;
    self.iconStar = iconStar;
    self.getFormattedDate = getFormattedDate;
    self.viewPlusUserCommentAboutParticipant = viewPlusUserCommentAboutParticipant;

    self.$onInit = onInit;

    self.items = [];
    self.selectedComment = null;
    self.stuntmanSearchSettings = {};
    self.selectedParticipant = null;

    function onInit() {
      _loadSelectedByBindingParticipant()
      _loadSelectedParticipant();
      DashboardEventService.onParticipantSelected(_loadSelectedParticipant);
    }

    function _loadSelectedParticipant(participantData) {
      if (participantData) {
        self.selectedParticipant = participantData;
        self.isEmpty = false;
        _loadNoteAboutParticipantDashboard();
      } else {
        DashboardService
          .getSelectedParticipant()
          .then(function (participantData) {
            if (participantData) {
              self.selectedParticipant = participantData;
              self.isEmpty = false;
              _loadNoteAboutParticipantDashboard();
            }
          });
      }
    }

    function _loadSelectedByBindingParticipant() {
      if (self.participant) {
        self.selectedParticipant = self.participant;
        _loadNoteAboutParticipantDashboard();
      }
    }

    function _loadNoteAboutParticipantDashboard() {
      self.stuntmanSearchSettings = {
        currentQuantity: SKIP,
        quantityToGet: LIMIT,
        recruitmentNumber: self.selectedParticipant.recruitmentNumber
      }

      UserCommentAboutParticipantService.getNoteAboutParticipant(self.stuntmanSearchSettings).then((arrayComment) => {
        self.items = arrayComment
      })
    }

    function viewPlusUserCommentAboutParticipant() {
      ApplicationStateService.userCommentAboutParticipant();
    }

    function showStarSelectedUserCommentAboutParticipant(userCommentAboutParticipant) {
      let starred = !userCommentAboutParticipant.starred;
      UserCommentAboutParticipantService.showStarSelectedUserCommentAboutParticipant(userCommentAboutParticipant._id, starred)
        .then(() => {
          userCommentAboutParticipant.starred = starred; //note com a chave de identificação do angular permite atribuir e atualiza o campo
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

    function _updateUserCommentAboutParticipant() {
      self.selectedComment.comment = self.comment;
      UserCommentAboutParticipantService.updateUserCommentAboutParticipant(self.selectedComment)
        .then(() => {
          UserCommentAboutParticipantService.showMsg('updateSuccessMessage');
          _loadNoteAboutParticipantDashboard();
          self.selectedComment = null;
          self.comment = "";
        })
        .catch(() => {
          UserCommentAboutParticipantService.showMsg('failureMessage');
        })
    }

    function saveUserCommentAboutParticipant() {
      if (self.selectedComment) {
        _updateUserCommentAboutParticipant();
      } else {
        UserCommentAboutParticipantService.saveUserCommentAboutParticipant({ comment: self.comment, recruitmentNumber: self.selectedParticipant.recruitmentNumber })
          .then(() => {
            UserCommentAboutParticipantService.showMsg('successUserCommentAboutParticipantCreation');
            self.comment = "";
            _loadNoteAboutParticipantDashboard();
          })
          .catch(() => {
            UserCommentAboutParticipantService.showMsg('failUserCommentAboutParticipantCreation');
          })
      }
    }

    function fillSelectedComment(itemComment) {
      if (self.selectedComment && self.selectedComment._id !== itemComment._id) {
        UserCommentAboutParticipantService.showMsg('conflictMessage');
        DialogService.showDialog(USER_COMMENT_MANAGER_LABELS.ATTRIBUTES_MESSAGE.confirmFillSelected)
          .then(function () {
            self.comment = itemComment.comment;
            self.selectedComment = itemComment;
            $element.find('#focus-textarea').focus();
          });
      } else {
        DialogService.showDialog(USER_COMMENT_MANAGER_LABELS.ATTRIBUTES_MESSAGE.confirmEditSelected)
          .then(function () {
            self.comment = itemComment.comment;
            self.selectedComment = itemComment;
            $element.find('#focus-textarea').focus();
          });
      }
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
              _loadNoteAboutParticipantDashboard();
            })
            .catch(() => {
              UserCommentAboutParticipantService.showMsg('failureMessage');
            })
        });
    }
  }
}());
