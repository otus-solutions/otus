(function () {
  'use strict';

  angular
    .module('otusjs.otus.dashboard.core')
    .service('otusjs.otus.dashboard.core.ContextService', Service);

  Service.$inject = [
    '$q'
  ];

  function Service($q) {
    var self = this;
    var _isLogged = false;

    //--------------------------------------------------------------------------------------------
    // Data from other contexts
    //--------------------------------------------------------------------------------------------
    var _selectedParticipantDefer = $q.defer();
    var _selectedParticipant = null;
    var _loggedUserDefer = $q.defer();
    var _loggedUser = null;

    /* Public methods */
    self.begin = begin;
    self.restore = restore;
    self.end = end;
    self.isValid = isValid;

    self.getSelectedParticipant = getSelectedParticipant;
    self.setSelectedParticipant = setSelectedParticipant;
    self.getLoggedUser = getLoggedUser;
    self.setLoggedUser = setLoggedUser;
    self.setChangedState = setChangedState;
    self.getChangedState = getChangedState;

    function getChangedState() {
      return self.changedState;
    }

    function setChangedState(state) {
      self.changedState = state;
    }

    function begin() {
      _removeParticipantFromMemory();
      _isLogged = true

    }

    function restore() {
      _isLogged = true;
    }

    function end() {
      _removeParticipantFromMemory();
      _isLogged = false;
    }

    function isValid() {
      _testInternalState();
    }

    //--------------------------------------------------------------------------------------------
    // Internal context methods
    //--------------------------------------------------------------------------------------------
    function _testInternalState() {
      if (!_isLogged) {
        throw new Error('Does not exist a valid session.', 'dashboard-context-service.js', 27);
      }
    }

    //--------------------------------------------------------------------------------------------
    // Custom context methods
    //--------------------------------------------------------------------------------------------

    function _removeParticipantFromMemory() {
      setSelectedParticipant();
    }

    function getSelectedParticipant() {
      return _selectedParticipantDefer.promise;
    }

    function setSelectedParticipant(participantData) {
      if (participantData) {
        _selectedParticipantDefer = $q.defer();
        _selectedParticipantDefer.resolve(participantData);
      }
    }

    function getLoggedUser() {
      return _loggedUserDefer.promise;
    }

    function setLoggedUser(userData) {
      _loggedUserDefer = $q.defer();
      if (userData) {
        _loggedUserDefer.resolve(userData);
      }
    }
  }
}());
