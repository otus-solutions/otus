(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.core')
    .service('otusjs.laboratory.core.ModuleService', Service);

  Service.$inject = [
    '$q',
    'otusjs.laboratory.core.ContextService',
    'otusjs.laboratory.core.EventService'
  ];

  function Service($q, ContextService, EventService) {
    var self = this;
    var _laboratoryRemoteStorageDefer = $q.defer();
    var _surveyDataSourceDefer = $q.defer();
    var _currentUser;

    self.RemoteStorage = {};
    self.DataSource = {};
    self.Event = EventService;

    /* Public methods */
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;
    self.getLaboratoryRemoteStorage = getLaboratoryRemoteStorage;
    self.getProjectRemoteStorage = getProjectRemoteStorage;
    self.setLaboratoryRemoteStorage = setLaboratoryRemoteStorage;
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

    function getLaboratoryRemoteStorage() {
      if (self.RemoteStorage.Laboratory) {
        _laboratoryRemoteStorageDefer = $q.defer();
        _laboratoryRemoteStorageDefer.resolve(self.RemoteStorage.Laboratory);
      }
      return {
        whenReady: function() {
          return _laboratoryRemoteStorageDefer.promise;
        }
      };
    }

    function setLaboratoryRemoteStorage(storage) {
      self.RemoteStorage.Laboratory = storage;
      _laboratoryRemoteStorageDefer.resolve(self.RemoteStorage.Laboratory);
    }

    function getProjectRemoteStorage() {
      if (self.RemoteStorage.project) {
        _laboratoryRemoteStorageDefer = $q.defer();
        _laboratoryRemoteStorageDefer.resolve(self.RemoteStorage.project);
      }
      return {
        whenReady: function() {
          return _laboratoryRemoteStorageDefer.promise;
        }
      };
    }

    function setProjectRemoteStorage(storage) {
      self.RemoteStorage.project = storage;
      _laboratoryRemoteStorageDefer.resolve(self.RemoteStorage.project);
    }

  }
}());
