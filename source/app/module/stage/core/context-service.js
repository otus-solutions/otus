(function () {
  'use strict';

  angular
    .module('otusjs.stage.core')
    .service('otusjs.stage.core.ContextService', Service);

  function Service() {
    const self = this;
    let _context = null;
    let _storage = null;

    const CONTEXT = 'stage';

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
    function _restoreContextData() {
      isValid();
      _context.fromJson(_storage.getItem(CONTEXT));
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