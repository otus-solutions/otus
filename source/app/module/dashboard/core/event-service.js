(function () {
  'use strict';

  angular
    .module('otusjs.otus.dashboard.core')
    .service('otusjs.otus.dashboard.core.EventService', Service);

  function Service() {
    var self = this;

    var _onParticipantSelectedListeners = [];
    var _onLoginListeners = [];
    var _onLogoutListeners = [];

    /* Public methods */
    self.fireParticipantSelected = fireParticipantSelected;
    self.onParticipantSelected = onParticipantSelected;
    self.unsubscribeOnParticipantSelected = unsubscribeOnParticipantSelected;
    self.fireLogin = fireLogin;
    self.onLogin = onLogin;
    self.fireLogout = fireLogout;
    self.onLogout = onLogout;

    function fireParticipantSelected(data) {
      console.log('selecionou');
      console.log(data);
      _notifyEvent(_onParticipantSelectedListeners, data, _onParticipantSelectedListeners.length);
    }

    function onParticipantSelected(listener) {
      _onParticipantSelectedListeners.push(listener);
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

    function unsubscribeOnParticipantSelected(listener) {
      var index = _onParticipantSelectedListeners.indexOf(listener);
      if (index > -1) {
        _onParticipantSelectedListeners.splice(index, 1);
      }
    }

    function _notifyEvent(listeners, data, endLoop) {
      for (var listener = 0; listener < endLoop; listener++) {
        listeners[listener](data);
      }
    }
  }
}());
