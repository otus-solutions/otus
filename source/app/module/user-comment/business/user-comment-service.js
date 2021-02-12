(function () {
  'use strict';

  angular
    .module('otusjs.user.comment.business')
    .service('otusjs.user.comment.business.UserCommentService', Service);

  Service.$inject = [
    '$mdToast',
    'otusjs.user.comment.repository.UserCommentRepositoryService'
  ];

  function Service($mdToast, UserCommentRepositoryService) {
    const self = this;

    self.showMsg = showMsg;
    self.getNoteAboutParticipant = getNoteAboutParticipant;

    function getNoteAboutParticipant() {
      return UserCommentRepositoryService.getNoteAboutParticipant();
    }

    function _setOrderByComment(items) {
      items.map(item => {

        item.acronyms.sort(function (a, b) {
          var nameA = a.name.toUpperCase();
          var nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          return 0;
        });
      });
    }

    function showMsg(msg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(msg)
          .hideDelay(2000)
      );
    }
  }
}());
