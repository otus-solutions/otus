(function () {
  'use strict';

  angular
    .module('otusjs.user.comment.repository')
    .service('otusjs.user.comment.repository.UserCommentRepositoryService', Service);

  Service.$inject = [
    'otusjs.user.comment.repository.UserCommentCollectionService'
  ];

  function Service(UserCommentCollectionService) {
    const self = this;

    self.getNoteAboutParticipant = getNoteAboutParticipant;

    function getNoteAboutParticipant() {
      return UserCommentCollectionService.getNoteAboutParticipant();
    }
  }
}());
