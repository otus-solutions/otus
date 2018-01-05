(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.core')
    .service('otusjs.laboratory.core.project.ModuleService', Service);

  Service.$inject = [
    '$q',
    'otusjs.laboratory.core.project.ContextService'
  ];

  function Service($q, ContextService) {
    var self = this;
    var _projectRemoteStorageDefer = $q.defer();
    var _currentUser;

    self.RemoteStorage = {};
    self.DataSource = {};

    /* Public methods */
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;
    self.getProjectRemoteStorage = getProjectRemoteStorage;
    self.setProjectRemoteStorage = setProjectRemoteStorage;
    self.setCurrentUser = setCurrentUser;

    function setCurrentUser(currentUser) {
      _currentUser = currentUser;
      ContextService.setCurrentUser(currentUser);
    }

    function configureContext(context) {
      ContextService.configureContext(context);
    }

    function configureStorage(storage) {
      ContextService.configureStorage(storage);
    }

    function getProjectRemoteStorage() {
      if (self.RemoteStorage.project) {
        _projectRemoteStorageDefer = $q.defer();
        _projectRemoteStorageDefer.resolve(self.RemoteStorage.project);
      }
      return {
        whenReady: function() {
          return _projectRemoteStorageDefer.promise;
        }
      };
    }

    function setProjectRemoteStorage(storage) {
      self.RemoteStorage.project = storage;
      _projectRemoteStorageDefer.resolve(self.RemoteStorage.project);
    }

  }
}());
