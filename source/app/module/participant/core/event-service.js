(function() {
  'use strict';

  angular
    .module('otusjs.participant.core')
    .service('otusjs.participant.core.EventService', Service);

  function Service() {
    var self = this;

    var _onParticipantSelectedListeners = [];
    var _onParticipantLoadedListeners = []
    var _onLogoutListeners = [];

    /* Public methods */
    self.fireParticipantSelected = fireParticipantSelected;
    self.fireParticipantLoaded = fireParticipantLoaded;
    self.onParticipantLoaded = onParticipantLoaded;
    self.onParticipantSelected = onParticipantSelected;
    self.fireLogout = fireLogout;
    self.onLogout = onLogout;

    function fireParticipantSelected(data) {
      _notifyEvent(_onParticipantSelectedListeners, data, _onParticipantSelectedListeners.length);
    }

    function fireParticipantLoaded(data) {
      _notifyEvent(_onParticipantLoadedListeners, data, _onParticipantLoadedListeners.length);
    }

    function onParticipantLoaded(listener) {
      _onParticipantLoadedListeners.push(listener);
    }

    function onParticipantSelected(listener) {
      _onParticipantSelectedListeners.push(listener);
    }

    function fireLogout(data) {
      _notifyEvent(_onLogoutListeners, data, _onLogoutListeners.length);
    }

    function onLogout(listener) {
      _onLogoutListeners.push(listener);
    }

    function _notifyEvent(listeners, data, endLoop) {
      for (var listener = 0; listener < endLoop; listener++) {
        listeners[listener](data);
      }
    }
  }
}());
