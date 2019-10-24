(function() {
  'use strict';

  angular
    .module('otusjs.report.core')
    .service('otusjs.report.core.ContextService', Service);

  Service.$inject = [
    'otusjs.report.core.EventService'
  ];

  function Service(EventService) {
    //todo: edit
    var self = this;
    var _context = null;
    var _storage = null;

    var REPORT_CONTEXT = 'report';

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

    self.selectParticipant = selectParticipant;
    self.getSelectedParticipant = getSelectedParticipant;

    function begin() {
      save();
    }

    function restore() {
      _restoreContextData();
      EventService.fireParticipantSelected(getData('selectedParticipant'));
    }

    function end() {
      _storage.removeItem(REPORT_CONTEXT);
    }

    function isValid() {
      _testInternalState();
      if (!hasContextActive()) {
        throw new Error('There is no active report context.', 'report/context-service.js', 56);
      }
    }

    function hasContextActive() {
      return _storage.getItem(REPORT_CONTEXT) ? true : false;
    }

    function save() {
      _testInternalState();
      _storage.setItem(REPORT_CONTEXT, _context.toJson());
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
      _context = contextFactory.create(REPORT_CONTEXT);
    }

    function configureStorage(storage) {
      _storage = storage;
    }

    //--------------------------------------------------------------------------------------------
    // Internal context methods
    //--------------------------------------------------------------------------------------------
    function _restoreContextData() {
      isValid();
      _context.fromJson(_storage.getItem(REPORT_CONTEXT));
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
    function selectParticipant(participant) {
      setData('selectedParticipant', participant);
    }

    function getSelectedParticipant() {
      return _context.getData('selectedParticipant');
    }
  }
}());
