(function () {
  'use strict';

  angular
    .module('otusjs.user.comment.core')
    .service('otusjs.user.comment.core.ContextService', Service);

  function Service() {
    const self = this;
    let _context = null;
    let _storage = null;

    const CONTEXT = 'user_comment';

    //* Public methods */
    self.begin = begin;
    self.end = end;
    self.save = save;
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;

    function begin() {
      save();
    }

    function end() {
      _storage.removeItem(CONTEXT);
    }

    function save() {
      _testInternalState();
      _storage.setItem(CONTEXT, _context.toJson());
    }

    //--------------------------------------------------------------------------------------------
    // Methods for application integration
    //--------------------------------------------------------------------------------------------
    function configureContext(contextFactory) {
      _context = contextFactory.create(CONTEXT);
    }

    function configureStorage(storage) {
      _storage = storage;
    }

    //--------------------------------------------------------------------------------------------
    // Internal context methods
    //--------------------------------------------------------------------------------------------
    function _testInternalState() {
      if (!_context) {
        throw new Error('Internal context is not initialized.');
      }
      if (!_storage) {
        throw new Error('Internal storage is not initialized.');
      }
    }

  }
}());
