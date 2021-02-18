(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.UserCommentAboutParticipantRestService', Service);

  Service.$inject = [
    '$q',
    'OtusRestResourceService'
  ];

  function Service($q, OtusRestResourceService) {
    let self = this;
    let _rest = null;

    self.initialize = initialize;
    self.getAllUsersComments = getAllUsersComments;
    self.showStarSelectedUserCommentAboutParticipant = showStarSelectedUserCommentAboutParticipant;
    self.deleteSelectedComment = deleteSelectedComment;
    self.saveUserCommentAboutParticipant = saveUserCommentAboutParticipant;
    self.updateUserCommentAboutParticipant = updateUserCommentAboutParticipant;

    function initialize() {
      _rest = OtusRestResourceService.getNoteAboutParticipantResourceFactory();
    }

    function getAllUsersComments(searchSettings) {
      _checkRest();
   
      return _rest.getAll({ rn: searchSettings.recruitmentNumber }, searchSettings).$promise
    }

    function showStarSelectedUserCommentAboutParticipant(commentId, starred) {
      return _rest.updateStarred({ id: commentId, starred: starred }).$promise;
    }

    function deleteSelectedComment(commentId) {
      return _rest.delete({ id: commentId }).$promise;
    }

    function saveUserCommentAboutParticipant(comment) {
      return _rest.create(comment).$promise;
    }

    function updateUserCommentAboutParticipant(comment) {
      return _rest.update(comment).$promise;
    }

    function _checkRest() {
      if (!_rest) {
        throw new Error('UserCommentAboutParticipantRestService resource is not initialized.');
      }
    }
  }
})();
