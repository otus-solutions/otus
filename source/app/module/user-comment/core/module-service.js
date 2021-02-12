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
    self.getUserCommentRemoteStorage = getUserCommentRemoteStorage;

    function configureContext(context) {
      ContextService.configureContext(context);
    }

    function configureStorage(storage) {
      ContextService.configureStorage(storage);
    }

    function configureRemoteStorage(restService) {
      _remoteStorage.genericUserComment = restService;
      _genericStorageDefer.resolve(_remoteStorage.genericUserComment);
    }

    function getUserCommentRemoteStorage() {
      if(_remoteStorage.genericUserComment){
        _genericStorageDefer = $q.defer();
        _genericStorageDefer.resolve(_remoteStorage.genericUserComment);
      }
      return {
        whenReady() {
          return _genericStorageDefer.promise;
        }
      }
    }

  }

}());
