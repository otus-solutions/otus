(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusUserCommentList', {
      controller: 'otusUserCommentListCtrl as $ctrl',
      templateUrl: 'app/ux-component/user-comment/user-comment-list-template.html'
    }).controller('otusUserCommentListCtrl', Controller);

  Controller.$inject = [
    '$element',
    'otusjs.participant.core.EventService',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.user.comment.business.UserCommentService',
    'USER_COMMENT_MANAGER_LABELS',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.genericListViewer.GenericListViewerService',
  ];

  function Controller($element, EventService, DialogService, UserCommentService, USER_COMMENT_MANAGER_LABELS, LoadingScreenService, GenericListViewerService) {
    const COLOR_STAR = 'rgb(253, 204, 13)';
    const LIMIT = 10;
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
    self.showMore = showMore;
    self.showAttribute = showAttribute;
    self.getAllItems = GenericListViewerService.getAllItems;
    self.callValidationItemsLimits = GenericListViewerService.callValidationItemsLimits;
    self.$onInit = onInit;

    self.items = [];
    self.selectedComment = null;
    self.recruitmentNumber = null;
    self.paginatorActive = true;
    self.stuntmanSearchSettings = {};

    function onInit() {
      // self.expanded = false;
      // self.showMoreIcon = VISIBILITY_ICON['false'];
      EventService.onParticipantSelected(_loadNoteAboutParticipant);
      _loadNoteAboutParticipant();
    }

    function _loadNoteAboutParticipant() {
      self.recruitmentNumber = UserCommentService.getSelectedParticipant().recruitmentNumber

      self.stuntmanSearchSettings = {
        currentQuantity: SKIP,
        quantityToGet: LIMIT,
        recruitmentNumber: self.recruitmentNumber
      }

      initialize(SKIP, LIMIT);

      self.getAllItems(self.stuntmanSearchSettings)
        .then((items) => self.items = items);
    }

    function initialize(skip, limit) {
      angular.extend(self, self, GenericListViewerService);
      self.init(null, skip, limit,
        UserCommentService.getNoteAboutParticipant, null, _genericParse);
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

    function showStarSelectedUserComment(userComment) {
      let starred = userComment.starred ? false : true;
      UserCommentService.showStarSelectedUserComment(userComment._id, starred)
        .then(() => {
          userComment.starred = starred;
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
          _loadNoteAboutParticipant();
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
            _loadNoteAboutParticipant();
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
      DialogService.showDialog(USER_COMMENT_MANAGER_LABELS.ATTRIBUTES_MESSAGE.deleteUserComment)
        .then(function () {
          UserCommentService.deleteSelectedComment(commentId)
            .then(() => {
              UserCommentService.showMsg('deleteSuccessMessage');
              _loadNoteAboutParticipant();
            })
            .catch(() => {
              UserCommentService.showMsg('failureMessage');
            })
        });
    }
  }
}());
