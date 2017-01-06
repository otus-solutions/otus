(function() {
  'use strict';

  angular
    .module('otusjs.application.session.core')
    .service('otusjs.application.session.core.EventService', Service);

  function Service() {
    var self = this;

    var _onLoginListeners = [];
    var _onLogoutListeners = [];

    /* Public methods */
    self.fireLogin = fireLogin;
    self.onLogin = onLogin;
    self.fireLogout = fireLogout;
    self.onLogout = onLogout;

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
