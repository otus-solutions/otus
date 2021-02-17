(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusUserCommentDashboardList', {
      controller: 'otusUserCommentDashboardListCtrl as $ctrl',
      templateUrl: 'app/ux-component/user-comment/user-comment-dashboard/user-comment-dashboard-list-template.html'
    }).controller('otusUserCommentDashboardListCtrl', Controller);

  Controller.$inject = [
    '$element',
    'otusjs.participant.core.EventService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.user.comment.business.UserCommentService',
    'USER_COMMENT_MANAGER_LABELS'
  ];

  function Controller($element, EventService, ApplicationStateService, DialogService, UserCommentService, USER_COMMENT_MANAGER_LABELS) {
    const COLOR_STAR = 'rgb(253, 204, 13)';
    const LIMIT = 5;
    const SKIP = 0;

    var self = this;

    /* Public methods */
    self.fillSelectedComment = fillSelectedComment;
    self.cancelFillSelectedComment = cancelFillSelectedComment;
    self.deleteSelectedComment = deleteSelectedComment;
    self.showStarSelectedUserComment = showStarSelectedUserComment;
    self.saveUserComment = saveUserComment;
    self.colorStar = colorStar;
    self.getFormattedDate = getFormattedDate;
    self.viewPlusUserComment = viewPlusUserComment;

    self.$onInit = onInit;

    self.items = [];
    self.selectedComment = null;
    self.stuntmanSearchSettings = {};
    self.recruitmentNumber = null;

    function onInit() {
      EventService.onParticipantSelected(_loadNoteAboutParticipantDashboard);
      _loadNoteAboutParticipantDashboard();
    }

    function _loadNoteAboutParticipantDashboard() {
      self.recruitmentNumber = UserCommentService.getSelectedParticipant().recruitmentNumber
      self.stuntmanSearchSettings = {
        currentQuantity: SKIP,
        quantityToGet: LIMIT,
        recruitmentNumber: self.recruitmentNumber
      }

      UserCommentService.getNoteAboutParticipant(self.stuntmanSearchSettings).then((arrayComment) => {
        self.items = arrayComment
      })
    }

    function viewPlusUserComment() {
      ApplicationStateService.userComment();
    }

    function showStarSelectedUserComment(userComment) {
     let starred = userComment.starred ? false : true;
      UserCommentService.showStarSelectedUserComment(userComment._id, starred)
        .then(() => {
          userComment.starred = starred //note com a chave de identificação que do angular permite atualizar campos
          starred = null;
          UserCommentService.showMsg('successMessage');
        })
        .catch(() => {
          UserCommentService.showMsg('failureMessage');
        })
    }

    function colorStar(starSelected) {
      return starSelected ? { color: COLOR_STAR } : null;
    }

    function getFormattedDate(date) {
      return UserCommentService.getFormattedDate(date);
    }

    function _updateUserComment() {
      self.selectedComment.comment = self.comment;
      UserCommentService.updateUserComment(self.selectedComment)
        .then(() => {
          UserCommentService.showMsg('updateSuccessMessage');
          _loadNoteAboutParticipantDashboard();
          self.selectedComment = null;
          self.comment = "";
        })
        .catch(() => {
          UserCommentService.showMsg('failureMessage');
        })
    }

    function saveUserComment() {
      if (self.selectedComment) {
        _updateUserComment();
      } else {
        UserCommentService.saveUserComment({ comment: self.comment, recruitmentNumber: self.recruitmentNumber })
          .then(() => {
            UserCommentService.showMsg('successUserCommentCreation');
            self.comment = "";
            _loadNoteAboutParticipantDashboard();
          })
          .catch(() => {
            UserCommentService.showMsg('failUserCommentCreation');
          })
      }
    }

    function fillSelectedComment(itemComment) {
      if (self.selectedComment && self.selectedComment._id !== itemComment._id) {
        UserCommentService.showMsg('conflictMessage');
        DialogService.showDialog(USER_COMMENT_MANAGER_LABELS.ATTRIBUTES_MESSAGE.confirmFillSelected)
          .then(function () {
            self.comment = itemComment.comment;
            self.selectedComment = itemComment;
            $element.find('#focus-textarea').focus();
          });
      } else {
        self.comment = itemComment.comment;
        self.selectedComment = itemComment;
        $element.find('#focus-textarea').focus();
      }
    }

    function cancelFillSelectedComment() {
      self.comment = "";
      self.selectedComment = null;
    }

    function deleteSelectedComment(commentId) {
      DialogService.showDialog(USER_COMMENT_MANAGER_LABELS.ATTRIBUTES_MESSAGE.deleteUserComment)
        .then(function () {
          UserCommentService.deleteSelectedComment(commentId)
            .then(() => {
              UserCommentService.showMsg('deleteSuccessMessage');
              _loadNoteAboutParticipantDashboard();
            })
            .catch(() => {
              UserCommentService.showMsg('failureMessage');
            })
        });
    }
  }
}());
