(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusUserCommentAboutParticipantList', {
      controller: 'otusUserCommentAboutParticipantListCtrl as $ctrl',
      templateUrl: 'app/ux-component/user-comment/user-comment-about-participant-list-template.html'
    }).controller('otusUserCommentAboutParticipantListCtrl', Controller);

  Controller.$inject = [
    '$element',
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.otus.dashboard.service.DashboardService',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.user.comment.business.UserCommentAboutParticipantService',
    'USER_COMMENT_MANAGER_LABELS',
    'otusjs.genericListViewer.GenericListViewerService',
  ];

  function Controller($element, DashboardEventService, DashboardService, DialogService, UserCommentAboutParticipantService, USER_COMMENT_MANAGER_LABELS, GenericListViewerService) {
    const STAR_COLOR = 'rgb(253, 204, 13)';
    const LIMIT = 10;
    const SKIP = 0;

    var self = this;

    /* Public methods */
    self.fillSelectedComment = fillSelectedComment;
    self.cancelFillSelectedComment = cancelFillSelectedComment;
    self.deleteSelectedComment = deleteSelectedComment;
    self.showStarSelectedUserCommentAboutParticipant = showStarSelectedUserCommentAboutParticipant;
    self.saveUserCommentAboutParticipant = saveUserCommentAboutParticipant;
    self.colorStar = colorStar;
    self.getFormattedDate = getFormattedDate;
    self.showMore = showMore;
    self.showAttribute = showAttribute;
    self.getAllItems = GenericListViewerService.getAllItems;
    self.callValidationItemsLimits = GenericListViewerService.callValidationItemsLimits;
    self.$onInit = onInit;

    self.items = [];
    self.selectedComment = null;
    self.selectedParticipant = null;
    self.paginatorActive = true;
    self.stuntmanSearchSettings = {};

    function onInit() {
      _loadSelectedParticipant();
      DashboardEventService.onParticipantSelected(_loadSelectedParticipant);
    }

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
      self.stuntmanSearchSettings = {
        currentQuantity: SKIP,
        quantityToGet: LIMIT,
        recruitmentNumber: self.selectedParticipant.recruitmentNumber
      }

      initialize(SKIP, LIMIT);

      self.getAllItems(self.stuntmanSearchSettings)
        .then((items) => self.items = items);
    }

    function initialize(skip, limit) {
      angular.extend(self, self, GenericListViewerService);
      self.init(null, skip, limit,
        UserCommentAboutParticipantService.getNoteAboutParticipant, null, _genericParse);
    }

    function _genericParse(items) {
      return items;
    }

    function showMore(item) {
      item.expanded = !item.expanded;
      item.showMoreIcon = USER_COMMENT_MANAGER_LABELS.VISIBILITY_ICON[item.expanded.toString()];
    }

    function showAttribute(item) {
      item.expanded = false;
      item.showMoreIcon = USER_COMMENT_MANAGER_LABELS.VISIBILITY_ICON['false'];
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
      return starSelected ? { color: STAR_COLOR } : null;
    }

    function getFormattedDate(date) {
      return UserCommentAboutParticipantService.getFormattedDate(date);
    }

    function _updateUserCommentAboutParticipant() {
      self.selectedComment.comment = self.comment;
      UserCommentAboutParticipantService.updateUserCommentAboutParticipant(self.selectedComment)
        .then(() => {
          UserCommentAboutParticipantService.showMsg('updateSuccessMessage');
          _loadNoteAboutParticipant();
          cancelFillSelectedComment();
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
            _loadNoteAboutParticipant();
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
          })
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
              _loadNoteAboutParticipant();
            })
            .catch(() => {
              UserCommentAboutParticipantService.showMsg('failureMessage');
            })
        });
    }
  }
}());
