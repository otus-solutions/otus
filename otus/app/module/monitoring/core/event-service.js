(function() {
  'use strict';

  angular
    .module('otusjs.monitoring.core')
    .service('otusjs.monitoring.core.EventService', Service);

  function Service() {
    var self = this;

    var _onParticipantSelectedListeners = [];
    var _onLogoutListeners = [];

    /* Public methods */
    self.fireLogout = fireLogout;
    self.onLogout = onLogout;


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
