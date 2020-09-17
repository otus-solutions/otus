(function() {
  'use strict';

  angular
    .module('otusjs.monitoring.core')
    .service('otusjs.monitoring.core.ContextService', Service);

  Service.$inject = [
    'otusjs.monitoring.core.EventService'
  ];

  function Service(EventService) {
    var self = this;
    var _context = null;
    var _storage = null;

    var MONITORING_CONTEXT = 'monitoring';

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

    function begin() {
      save();
    }

    function restore() {
      _restoreContextData();
    }

    function end() {
      _storage.removeItem(MONITORING_CONTEXT);
    }

    function isValid() {
      _testInternalState();
      if (!hasContextActive()) {
        throw new Error('There is no active monitoring context.', 'monitoring/context-service.js', 54);
      }
    }

    function hasContextActive() {
      return !!_storage.getItem(MONITORING_CONTEXT);
    }

    function save() {
      _testInternalState();
      _storage.setItem(MONITORING_CONTEXT, _context.toJson());
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
      _context = contextFactory.create(MONITORING_CONTEXT);
    }

    function configureStorage(storage) {
      _storage = storage;
    }

    //--------------------------------------------------------------------------------------------
    // Internal context methods
    //--------------------------------------------------------------------------------------------
    function _restoreContextData() {
      isValid();
      _context.fromJson(_storage.getItem(MONITORING_CONTEXT));
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

  }
}());
