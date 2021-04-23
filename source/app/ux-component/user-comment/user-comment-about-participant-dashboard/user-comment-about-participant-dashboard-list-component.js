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
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.otus.dashboard.service.DashboardService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.user.comment.business.UserCommentAboutParticipantService',
    'USER_COMMENT_MANAGER_LABELS'
  ];

  function Controller(
    DashboardEventService,
    DashboardService,
    ApplicationStateService,
    DialogService,
    UserCommentAboutParticipantService,
    USER_COMMENT_MANAGER_LABELS) {
    const MAX_COMMENT_QUANTITY = 3;
    const DIALOG_CONTROLLER = 'otusUserCommentAboutParticipantDialogCtrl';
    const DIRECTORY_DIALOG_CONTROLLER = 'app/ux-component/user-comment/user-comment-about-participant-dialog/user-comment-about-participant-dialog-template.html';

    var self = this;

    /* Public methods */
    self.viewUserCommentAboutParticipant = viewUserCommentAboutParticipant;
    self.deleteSelectedComment = deleteSelectedComment;
    self.showStarSelectedUserCommentAboutParticipant = showStarSelectedUserCommentAboutParticipant;
    self.addUserCommentAboutParticipant = addUserCommentAboutParticipant;
    self.updateUserCommentAboutParticipant = updateUserCommentAboutParticipant;
    self.colorStar = colorStar;
    self.iconStar = iconStar;
    self.getFormattedDate = getFormattedDate;
    self.viewPlusUserCommentAboutParticipant = viewPlusUserCommentAboutParticipant;
    self.openMenu = openMenu;

    self.$onInit = onInit;

    self.items = [];
    self.selectedParticipant = null;

    function onInit() {
      _loadSelectedByBindingParticipant()
      _loadSelectedParticipant();
      DashboardEventService.onParticipantSelected(_loadSelectedParticipant);
    }

    function openMenu($mdMenu, ev) {
      $mdMenu.open(ev);
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

    async function _loadNoteAboutParticipantDashboard() {
      self.items = await UserCommentAboutParticipantService.getDashboardComments(self.selectedParticipant.recruitmentNumber, MAX_COMMENT_QUANTITY)
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

    function updateUserCommentAboutParticipant(selectedComment) {
      selectedComment.verify = false;
      selectedComment.dialog = USER_COMMENT_MANAGER_LABELS.ATTRIBUTES_MESSAGE.editComment;
      DialogService.showCustomizedDialog(selectedComment, DIALOG_CONTROLLER, DIRECTORY_DIALOG_CONTROLLER, true)
        .then(() => _loadNoteAboutParticipantDashboard())
        .catch(() => _loadNoteAboutParticipantDashboard());
    }

    function addUserCommentAboutParticipant() {
      let selectedComment = {};
      selectedComment.verify = false;
      selectedComment.dialog = USER_COMMENT_MANAGER_LABELS.ATTRIBUTES_MESSAGE.createComment;
      selectedComment.recruitmentNumber = self.selectedParticipant.recruitmentNumber;
      DialogService.showCustomizedDialog(selectedComment, DIALOG_CONTROLLER, DIRECTORY_DIALOG_CONTROLLER, true)
        .then(() => _loadNoteAboutParticipantDashboard())
        .catch(() => _loadNoteAboutParticipantDashboard());
    }

    function viewUserCommentAboutParticipant(selectedComment) {
      if (selectedComment.isCreator) {
        updateUserCommentAboutParticipant(selectedComment);
      } else {
        selectedComment.verify = true;
        selectedComment.dialog = USER_COMMENT_MANAGER_LABELS.ATTRIBUTES_MESSAGE.viewComment;
        DialogService.showCustomizedDialog(selectedComment, DIALOG_CONTROLLER, DIRECTORY_DIALOG_CONTROLLER, true)
          .then(() => _loadNoteAboutParticipantDashboard())
          .catch(() => _loadNoteAboutParticipantDashboard());
      }
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
