(function () {
  'use strict';

  angular
    .module('otusjs.project.contact.core')
    .service('otusjs.project.contact.core.ContextService', Service);

  function Service() {
    const self = this;
    let _context = null;
    let _storage = null;

    const PROJECT_CONTACT_CONTEXT = 'project-contact';

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
      _storage.setItem(PROJECT_CONTACT_CONTEXT, _context.toJson());
    }

    //--------------------------------------------------------------------------------------------
    // Methods for application integration
    //--------------------------------------------------------------------------------------------
    function configureContext(contextFactory) {
      _context = contextFactory.create(PROJECT_CONTACT_CONTEXT);
    }

    function configureStorage(storage) {
      _storage = storage;
    }

    //--------------------------------------------------------------------------------------------
    // Internal context methods
    //--------------------------------------------------------------------------------------------
    function _restoreContextData() {
      isValid();
      _context.fromJson(_storage.getItem(PROJECT_CONTACT_CONTEXT));
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