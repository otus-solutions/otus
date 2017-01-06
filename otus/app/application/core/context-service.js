(function() {
  'use strict';

  angular
    .module('otusjs.application.core')
    .service('otusjs.application.core.ContextService', Service);

  Service.$inject = [
    '$q'
  ];

  function Service($q) {
    var self = this;
    var _context = null;
    var _storage = null;

    var APPLICATION_CONTEXT = 'application_context';

    //--------------------------------------------------------------------------------------------
    // Data from other contexts
    //--------------------------------------------------------------------------------------------
    var _selectedParticipantDefer = null;
    var _selectedParticipant = null;

    /* Public methods */
    self.begin = begin;
    self.restore = restore;
    self.end = end;
    self.isValid = isValid;
    self.save = save;

    self.configureContext = configureContext;
    self.configureStorage = configureStorage;

    self.getData = getData;
    self.setData = setData;
    self.removeData = removeData;

    self.getSelectedParticipant = getSelectedParticipant;
    self.setSelectedParticipant = setSelectedParticipant;
    self.selectActivities = selectActivities;
    self.getSelectedActivities = getSelectedActivities;
    self.clearSelectedActivities = clearSelectedActivities;

    function begin() {
      save();
    }

    function restore() {
      _testInternalState();
      _restoreContextData();
    }

    function end() {
      _storage.removeItem(APPLICATION_CONTEXT);
    }

    function isValid() {
      _testInternalState();
    }

    function save() {
      _testInternalState();
      _storage.setItem(APPLICATION_CONTEXT, _context.toJson());
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
      _context = contextFactory.create(APPLICATION_CONTEXT);
    }

    function configureStorage(storage) {
      _storage = storage;
    }

    //--------------------------------------------------------------------------------------------
    // Internal context methods
    //--------------------------------------------------------------------------------------------
    function _restoreContextData() {
      _testInternalState();
      _context.fromJson(_storage.getItem(APPLICATION_CONTEXT));
    }

    function _testInternalState() {
      if (!_context) {
        throw new Error('Internal context is not initialized.', 'application-context-service.js', 159);
      }
      if (!_storage) {
        throw new Error('Internal storage is not initialized.', 'application-context-service.js', 165);
      }
    }

    //--------------------------------------------------------------------------------------------
    // Custom context methods
    //--------------------------------------------------------------------------------------------
    function getSelectedParticipant() {
      return _selectedParticipantDefer.promise;
    }

    function setSelectedParticipant(participantData) {
      _selectedParticipantDefer = $q.defer();
      if (participantData) {
        _selectedParticipantDefer.resolve(participantData);
      }
    }

    function getSelectedActivities() {
      return getData('selectedActivities');
    }

    function clearSelectedActivities() {
      setData('selectedActivities', []);
    }

    function selectActivities(activities) {
      setData('selectedActivities', activities);
    }
  }
}());
