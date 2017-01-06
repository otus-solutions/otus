(function() {
  'use strict';

  angular
    .module('otusjs.user.access.core')
    .service('otusjs.user.access.core.ContextService', Service);

  function Service() {
    var self = this;
    var _isLogged = false;
    var _context = null;
    var _storage = null;

    /* Public methods */
    self.isValid = isValid;
    self.begin = begin;
    self.ignore = ignore;
    self.end = end;

    self.configureContext = configureContext;
    self.configureStorage = configureStorage;

    function begin() {
      _isLogged = false;
    }

    function ignore() {
      _isLogged = true;
    }

    function end() {
      _isLogged = true;
    }

    function isValid() {
      _testInternalState();
    }

    //--------------------------------------------------------------------------------------------
    // Methods for application integration
    //--------------------------------------------------------------------------------------------
    function configureContext(contextFactory) {
      // _context = contextFactory.create(CONTEXT_DATA.USER_CONTEXT);
    }

    function configureStorage(storage) {
      // _storage = storage;
    }

    //--------------------------------------------------------------------------------------------
    // Internal context methods
    //--------------------------------------------------------------------------------------------
    function _testInternalState() {
      if (_isLogged) {
        throw new Error('Already exists an initialized session.', 'access-context-service.js', 34);
      }
    }
  }
}());
