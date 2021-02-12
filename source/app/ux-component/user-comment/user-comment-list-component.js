(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusUserCommentList', {
      controller: 'otusUserCommentListCtrl as $ctrl',
      templateUrl: 'app/ux-component/user-comment/user-comment-list-template.html'
    }).controller('otusUserCommentListCtrl', Controller);

  Controller.$inject = [
    '$mdColors',
    'otusjs.activity.core.EventService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.user.comment.business.UserCommentService'
  ];

  function Controller($mdColors, EventService, ApplicationStateService, DialogService, UserCommentService) {
    var self = this;

    /* Public methods */
    self.fillSelectedComment = fillSelectedComment;
    self.deleteSelectedComment = deleteSelectedComment;
    self.refreshComment = refreshComment;

    self.$onInit = onInit;

    self.items = [];
    self.itemsArrayNull = false;
    self.colorStage = $mdColors.getThemeColor('primary-hue-1');

    function onInit() {
      EventService.onParticipantSelected(refreshComment);
      refreshComment();
    }

    function refreshComment() {
      // _loadNoteAboutParticipant();
      self.items = [
        {
          _id: '113234',
          recruitmentNumber: '132324',
          name: 'Fulano',
          date: '11/02/21',
          edit: true,
          comment: 'primeiro teste de commentários cf4trehyrgwsfwartshdfhdseyhrdyhseedgsegsdgsdhdfhdfhrsdghsgsgdrfhgdghdghsdfghdfhfghjftujhgfjdshfd',
          email: 'fulano@gmail.com',
          isCreate: true
        },
        {
          _id: '113234',
          recruitmentNumber: '132324',
          name: 'Fulano',
          date: '11/02/21',
          edit: true,
          comment: 'primeiro teste de commentários cf4trehyrgwsfwartshdfhdseyhrdyhseedgsegsdgsdhdfhdfhrsdghsgsgdrfhgdghdghsdfghdfhfghjftujhgfjdshfd',
          email: 'fulano@gmail.com'
        },
        {
          _id: '113234',
          recruitmentNumber: '132324',
          name: 'Fulano',
          date: '11/02/21',
          edit: true,
          comment: 'primeiro teste de commentários cf4trehyrgwsfwartshdfhdseyhrdyhseedgsegsdgsdhdfhdfhrsdghsgsgdrfhgdghdghsdfghdfhfghjftujhgfjdshfd',
          email: 'fulano@gmail.com'
        },
        {
          _id: '113234',
          recruitmentNumber: '132324',
          name: 'Fulano',
          date: '11/02/21',
          edit: true,
          comment: 'primeiro teste de commentários cf4trehyrgwsfwartshdfhdseyhrdyhseedgsegsdgsdhdfhdfhrsdghsgsgdrfhgdghdghsdfghdfhfghjftujhgfjdshfd',
          email: 'fulano@gmail.com'
        },
        {
          _id: '113234',
          recruitmentNumber: '132324',
          name: 'Fulano',
          date: '11/02/21',
          edit: true,
          comment: 'primeiro teste de commentários cf4trehyrgwsfwartshdfhdseyhrdyhseedgsegsdgsdhdfhdfhrsdghsgsgdrfhgdghdghsdfghdfhfghjftujhgfjdshfd',
          email: 'fulano@gmail.com'
        }
      ];
    }

    function _loadNoteAboutParticipant() {
      UserCommentService.getNoteAboutParticipant().then((arrayComment) => {
        self.items = arrayComment
      })
    }

    function _getFormattedDate(date) {//TODO add service
      try {
        let formattedDate = new Date(date);
        return formattedDate.getDate() + '/' + (formattedDate.getMonth() + 1) + '/' + formattedDate.getFullYear();
      } catch (e) {
        return null;
      }
    }

    function fillSelectedComment(itemComment) {

      // ParticipantActivityService.selectActivities([itemComment]);
      ApplicationStateService.activateActivityPlayer();
    }

    function deleteSelectedComment(itemComment) {

      DialogService.showConfirmationDialog().then(function () {
        refreshComment();
        UserCommentService.showMsg();
      });
    }

  }
}());
