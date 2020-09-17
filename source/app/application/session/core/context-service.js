(function() {
  'use strict';

  angular
    .module('otusjs.application.session.core')
    .service('otusjs.application.session.core.ContextService', Service);

  Service.$inject = [
    '$q',
    '$window',
    'otusjs.application.session.core.EventService',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.application.dialog.DialogShowService'
  ];

  function Service($q, $window,EventService, LoadingScreenService, DialogShowService) {
    var self = this;

    var _context = null;
    var _storage = null;
    var _shouldRestore = true;
    var loggedUserPromise = $q.defer();

    var SESSION_CONTEXT = 'session_context';
    var LOGGED_USER = 'loggedUser';
    var USER_TOKEN = 'outk';

    //--------------------------------------------------------------------------------------------
    // Data from other contexts
    //--------------------------------------------------------------------------------------------

    /* Public methods */
    self.begin = begin;
    self.restore = restore;
    self.end = end;
    self.isValid = isValid;
    self.hasContextActive = hasContextActive;
    self.save = save;

    self.configureContext = configureContext;
    self.configureStorage = configureStorage;
    self.getLoggedUser = getLoggedUser;

    self.getData = getData;
    self.setData = setData;
    self.removeData = removeData;

    self.getToken = getToken;

    function begin(sessionData) {
      $window.sessionStorage.setItem(USER_TOKEN, sessionData.token);

      loggedUserPromise = $q.defer();
      loggedUserPromise.resolve(sessionData);
      setData(LOGGED_USER, sessionData);
    }

    function restore() {
      isValid();
      _restoreContextData();
      // TODO: Refresh issue
      if(_shouldRestore) {
        EventService.fireLogin(getData(LOGGED_USER));
        _shouldRestore = false;
      }
    }

    function end() {
      _storage.removeItem(SESSION_CONTEXT);
      $window.sessionStorage.removeItem(USER_TOKEN);
    }

    function isValid() {
      _testInternalState();
      if (!hasContextActive()) {
        LoadingScreenService.finish();
        $window.location.href = '/#/login'
        DialogShowService.showConfirmationDialog("A sessão expirou",
          "Você foi redirecionado para pagina de login",
          "login")
        throw new Error('There is no active session context.', 'session/context-service.js', 58);
      }
    }

    function hasContextActive() {
      return !!_storage.getItem(SESSION_CONTEXT);
    }

    function save() {
      _testInternalState();
      _storage.setItem(SESSION_CONTEXT, _context.toJson());
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
      _context = contextFactory.create(SESSION_CONTEXT);
    }

    function configureStorage(storage) {
      _storage = storage;
    }

    function getLoggedUser() {
      return loggedUserPromise.promise
    }

    //--------------------------------------------------------------------------------------------
    // Internal context methods
    //--------------------------------------------------------------------------------------------
    function _restoreContextData() {
      isValid();
      if (hasContextActive()) {
        _context.fromJson(_storage.getItem(SESSION_CONTEXT));
      }
    }

    function _testInternalState() {
      if (!_context) {
        throw new Error('Internal context is not initialized.', 'session-context-service.js', 152);
      }
      if (!_storage) {
        throw new Error('Internal storage is not initialized.', 'application-context-service.js', 158);
      }
    }

    //--------------------------------------------------------------------------------------------
    // Custom context methods
    //--------------------------------------------------------------------------------------------
    function getToken() {
      return $window.sessionStorage.getItem(USER_TOKEN);
    }
  }
}());
