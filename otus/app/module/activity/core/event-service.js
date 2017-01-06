(function() {
  'use strict';

  angular
    .module('otusjs.activity.core')
    .service('otusjs.activity.core.EventService', Service);

  function Service() {
    var self = this;

    var _onParticipantSelectedListeners = [];
    var _onActivitySelectedListeners = [];
    var _onLoginListeners = [];
    var _onLogoutListeners = [];

    /* Public methods */
    self.fireParticipantSelected = fireParticipantSelected;
    self.onParticipantSelected = onParticipantSelected;
    self.fireActivitySelected = fireActivitySelected;
    self.onActivitySelected = onActivitySelected;
    self.fireLogin = fireLogin;
    self.onLogin = onLogin;
    self.fireLogout = fireLogout;
    self.onLogout = onLogout;

    function fireParticipantSelected(data) {
      _notifyEvent(_onParticipantSelectedListeners, data, _onParticipantSelectedListeners.length);
    }

    function onParticipantSelected(listener) {
      _onParticipantSelectedListeners.push(listener);
    }

    function fireActivitySelected(data) {
      _notifyEvent(_onActivitySelectedListeners, data, _onActivitySelectedListeners.length);
    }

    function onActivitySelected(listener) {
      _onActivitySelectedListeners.push(listener);
    }

    function fireLogin(data) {
      _notifyEvent(_onLoginListeners, data, _onLoginListeners.length);
    }

    function onLogin(listener) {
      _onLoginListeners.push(listener);
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
