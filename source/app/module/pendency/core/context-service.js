(function () {
  'use strict';

  angular
    .module('otusjs.pendency.core')
    .service('otusjs.pendency.core.ContextService', Service);

  function Service() {
    const self = this;
    let _context = null;
    let _storage = null;

    const PENDENCY_CONTEXT = 'pendency';

    //* Public methods */
    self.begin = begin;
    self.save = save;
    self.configureContext = configureContext;
    self.configureStorage = configureStorage;

    function begin() {
      save();
    }

    function save() {
      _testInternalState();
      _storage.setItem(PENDENCY_CONTEXT, _context.toJson());
    }

    //--------------------------------------------------------------------------------------------
    // Methods for application integration
    //--------------------------------------------------------------------------------------------
    function configureContext(contextFactory) {
      _context = contextFactory.create(PENDENCY_CONTEXT);
    }

    function configureStorage(storage) {
      _storage = storage;
    }

    //--------------------------------------------------------------------------------------------
    // Internal context methods
    //--------------------------------------------------------------------------------------------
    function _restoreContextData() {
      isValid();
      _context.fromJson(_storage.getItem(PENDENCY_CONTEXT));
    }

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