(function () {
  'use strict';

  angular
    .module('otusjs.user.comment.core')
    .service('otusjs.user.comment.core.ModuleService', Service);

  Service.$inject = [
    '$q',
    'otusjs.user.comment.core.ContextService'
  ];

  function Service($q, ContextService) {
    const self = this;
    let _genericStorageDefer = $q.defer();
    let _remoteStorage = {};

    /* Public methods */
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;
    self.configureRemoteStorage = configureRemoteStorage;
    self.getUserCommentAboutParticipantRemoteStorage = getUserCommentAboutParticipantRemoteStorage;

    function configureContext(context) {
      ContextService.configureContext(context);
    }

    function configureStorage(storage) {
      ContextService.configureStorage(storage);
    }

    function configureRemoteStorage(restService) {
      _remoteStorage.genericUserCommentAboutParticipant = restService;
      _genericStorageDefer.resolve(_remoteStorage.genericUserCommentAboutParticipant);
    }

    function getUserCommentAboutParticipantRemoteStorage() {
      if (_remoteStorage.genericUserCommentAboutParticipant) {
        _genericStorageDefer = $q.defer();
        _genericStorageDefer.resolve(_remoteStorage.genericUserCommentAboutParticipant);
      }
      return {
        whenReady() {
          return _genericStorageDefer.promise;
        }
      }
    }

  }

}());
