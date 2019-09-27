(function () {
  'use strict';

  angular
    .module('otusjs.user.core')
    .service('otusjs.user.core.ContextService', Service);

  Service.$inject = [
    '$q',
    'otusjs.user.core.EventService'
  ];

  function Service($q, EventService) {
    var self = this;
    var _context = null;
    var _storage = null;

    var USER_CONTEXT = 'user_context';
    var SELECTED_USER = 'selectedUser';
    var USER_PERMISSION = 'userPermission';

    //* Public methods */
    self.begin = begin;
    self.restore = restore;
    self.end = end;
    self.isValid = isValid;
    self.hasContextActive = hasContextActive;
    self.save = save;

    self.getData = getData;
    self.setData = setData;
    self.removeData = removeData;

    self.configureContext = configureContext;
    self.configureStorage = configureStorage;

    self.selectUser = selectUser;
    self.getSelectedUser = getSelectedUser;
    self.setUserPermissions = setUserPermissions;
    self.getUserPermissions = getUserPermissions;

    function begin() {
      save();
    }

    function restore() {
      _restoreContextData();
      EventService.fireUserSelected(_context.getData(SELECTED_USER));
    }

    function end() {
      _storage.removeItem(USER_CONTEXT);
    }

    function isValid() {
      _testInternalState();
      if (!hasContextActive()) {
        throw new Error('There is no active user context.', 'user/context-service.js', 61);
      }
    }

    function hasContextActive() {
      return _storage.getItem(USER_CONTEXT) ? true : false;
    }

    function save() {
      _testInternalState();
      _storage.setItem(USER_CONTEXT, _context.toJson());
    }

    //--------------------------------------------------------------------------------------------
    // Context methods
    //--------------------------------------------------------------------------------------------
    function getData(dataKey) {
      _testInternalState();
      return _context.getData(dataKey);
    }

    function setData(dataKey, dataValue) {
      _testInternalState();
      _context.setData(dataKey, dataValue);
      save();
    }

    function removeData(dataKey) {
      _testInternalState();
      _context.removeData(dataKey);
      save();
    }

    //--------------------------------------------------------------------------------------------
    // Methods for application integration
    //--------------------------------------------------------------------------------------------
    function configureContext(contextFactory) {
      _context = contextFactory.create(USER_CONTEXT);
    }

    function configureStorage(storage) {
      _storage = storage;
    }

    //--------------------------------------------------------------------------------------------
    // Internal context methods
    //--------------------------------------------------------------------------------------------
    function _restoreContextData() {
      isValid();
      _context.fromJson(_storage.getItem(USER_CONTEXT));
    }

    function _testInternalState() {
      if (!_context) {
        throw new Error('Internal context is not initialized.');
      }
      if (!_storage) {
        throw new Error('Internal storage is not initialized.');
      }
    }

    //--------------------------------------------------------------------------------------------
    // Custom context methods
    //--------------------------------------------------------------------------------------------
    function selectUser(user) {
      setData('selectedUser', user);
    }

    function getSelectedUser() {
      return _context.getData('selectedUser');
    }

    var defer = $q.defer();

    function setUserPermissions(permissionsData) {
      defer.resolve(permissionsData);
    }

    function getUserPermissions() {
      return defer.promise;
    }
  }
}());
