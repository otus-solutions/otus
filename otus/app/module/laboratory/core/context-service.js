(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.core')
    .service('otusjs.laboratory.core.ContextService', Service);

  Service.$inject = [
    '$q',
    'otusjs.laboratory.core.EventService'
  ];

  function Service($q, EventService) {
    var self = this;
    var _context = null;
    var _storage = null;

    var LABORATORY_CONTEXT = 'laboratory_context';

    //--------------------------------------------------------------------------------------------
    // Data from other contexts
    //--------------------------------------------------------------------------------------------
    var _selectedParticipantDefer = $q.defer();
    var _selectedParticipant = null;
    var _loggedUser = null;

    /* Public methods */
    self.begin = begin;
    self.restore = restore;
    self.end = end;
    self.isValid = isValid;
    self.hasContextActive = hasContextActive;
    self.save = save;

    self.configureContext = configureContext;
    self.configureStorage = configureStorage;

    self.getData = getData;
    self.setData = setData;
    self.removeData = removeData;
    self.getSelectedParticipant = getSelectedParticipant;
    self.setSelectedParticipant = setSelectedParticipant;
    self.setCurrentUser = setCurrentUser;
    self.getCurrentUser = getCurrentUser;

    self.selectLot = selectLot;
    self.getSelectedLot = getSelectedLot;
    self.setSelectedExamLot = setSelectedExamLot;
    self.getSelectedExamLot = getSelectedExamLot;
    self.setLotInfoManagerAction = setLotInfoManagerAction;
    self.getLotInfoManagerAction = getLotInfoManagerAction;
    self.setSelectedFieldCenter = setSelectedFieldCenter;
    self.getSelectedFieldCenter = getSelectedFieldCenter;
    self.setSelectedExamType = setSelectedExamType;
    self.getSelectedExamType = getSelectedExamType;

    function begin() {
      _context.clear();
      save();
    }

    function restore() {
      _restoreContextData();
    }

    function end() {
      _storage.removeItem(LABORATORY_CONTEXT);
    }


    function isValid() {
      _testInternalState();
      if (!hasContextActive()) {
        throw new Error('There is no a laboratory context.', 'laboratory/context-service.js', 57);
      }
    }

    function hasContextActive() {
      return _storage.getItem(LABORATORY_CONTEXT) ? true : false;
    }

    function save() {
      _testInternalState();
      _storage.setItem(LABORATORY_CONTEXT, _context.toJson());
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
      _context = contextFactory.create(LABORATORY_CONTEXT);
    }

    function configureStorage(storage) {
      _storage = storage;
    }

    //--------------------------------------------------------------------------------------------
    // Internal context methods
    //--------------------------------------------------------------------------------------------
    function _restoreContextData() {
      isValid();
      _context.fromJson(_storage.getItem(LABORATORY_CONTEXT));
    }

    function _testInternalState() {
      if (!_context) {
        throw new Error('Internal context is not initialized.', 'context-service.js', 111);
      }
      if (!_storage) {
        throw new Error('Internal storage is not initialized.', 'context-service.js', 114);
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

    function setCurrentUser(currentUser) {
      _loggedUser = currentUser;
    }

    function getCurrentUser(currentUser) {
      return _loggedUser;
    }

    //--------------------------------------------------------------------------------------------
    // Custom context methods
    //--------------------------------------------------------------------------------------------
    function selectLot(lot) {
      setData('selectedLot', lot);
    }

    function getSelectedLot() {
      return getData('selectedLot');
    }

    function setSelectedExamLot(examLot) {
      setData('selectedExamLot', examLot);
    }

    function getSelectedExamLot() {
      return getData('selectedExamLot');
    }

    function setSelectedFieldCenter(fieldcenter) {
      setData('selectedFieldcenter', fieldcenter);
    }

    function getSelectedFieldCenter() {
      return getData('selectedFieldcenter');
    }

    function setSelectedExamType(ExamType) {
      setData('selectedExamType', ExamType);
    }

    function getSelectedExamType() {
      return getData('selectedExamType');
    }

    function setLotInfoManagerAction(action) {
      setData('lotInfoManagerAction', action);
    }

    function getLotInfoManagerAction() {
      return getData('lotInfoManagerAction');
    }
  }
}());
