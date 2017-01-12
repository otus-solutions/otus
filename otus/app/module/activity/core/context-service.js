(function() {
  'use strict';

  angular
    .module('otusjs.activity.core')
    .service('otusjs.activity.core.ContextService', Service);

  Service.$inject = [
    '$q',
    'otusjs.activity.core.EventService'
  ];

  function Service($q, EventService) {
    var self = this;
    var _context = null;
    var _storage = null;

    var ACTIVITY_CONTEXT = 'activity_context';

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
    self.getLoggedUser = getLoggedUser;
    self.setLoggedUser = setLoggedUser;
    self.getSelectedActivities = getSelectedActivities;
    self.clearSelectedActivities = clearSelectedActivities;
    self.selectActivities = selectActivities;
    self.getActivityToPlay = getActivityToPlay;
    self.setActivityToPlay = setActivityToPlay;
    self.existsActivityToPlay = existsActivityToPlay;

    function begin() {
      _context.clear();
      save();
    }

    function restore() {
      _restoreContextData();
    }

    function end() {
      _storage.removeItem(ACTIVITY_CONTEXT);
    }

    function isValid() {
      _testInternalState();
      if (!hasContextActive()) {
        throw new Error('There is no active activity context.', 'activity/context-service.js', 61);
      }
    }

    function hasContextActive() {
      return _storage.getItem(ACTIVITY_CONTEXT) ? true : false;
    }

    function save() {
      _testInternalState();
      _storage.setItem(ACTIVITY_CONTEXT, _context.toJson());
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
      _context = contextFactory.create(ACTIVITY_CONTEXT);
    }

    function configureStorage(storage) {
      _storage = storage;
    }

    //--------------------------------------------------------------------------------------------
    // Internal context methods
    //--------------------------------------------------------------------------------------------
    function _restoreContextData() {
      isValid();
      _context.fromJson(_storage.getItem(ACTIVITY_CONTEXT));
    }

    function _testInternalState() {
      if (!_context) {
        throw new Error('Internal context is not initialized.', 'activity-context-service.js', 159);
      }
      if (!_storage) {
        throw new Error('Internal storage is not initialized.', 'activity-context-service.js', 165);
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

    function getLoggedUser() {
      return _loggedUser;
    }

    function setLoggedUser(loggedUser) {
      _loggedUser = loggedUser;
    }

    function getSelectedActivities() {
      return getData('selectedActivities') || [];
    }

    function clearSelectedActivities() {
      setData('selectedActivities', []);
    }

    function selectActivities(activities) {
      setData('selectedActivities', activities);
      EventService.fireActivitySelected(activities);
    }

    function getActivityToPlay() {
      return getData('activityToPlay');
    }

    function setActivityToPlay(activity) {
      setData('activityToPlay', activity);
    }

    function existsActivityToPlay() {
      if (getData('activityToPlay')) {
        return true;
      } else {
        return false;
      }
    }
  }
}());
