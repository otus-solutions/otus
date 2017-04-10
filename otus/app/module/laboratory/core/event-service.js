(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.core')
    .service('otusjs.laboratory.core.EventService', Service);

  function Service() {
    var self = this;

    var _onParticipantSelectedListeners = [];

    /* Public methods */
    self.fireParticipantSelected = fireParticipantSelected;
    self.onParticipantSelected = onParticipantSelected;

    function fireParticipantSelected(data) {
      _notifyEvent(_onParticipantSelectedListeners, data, _onParticipantSelectedListeners.length);
    }

    function onParticipantSelected(listener) {
      if (!_onParticipantSelectedListeners.length) {
        _onParticipantSelectedListeners.push(listener);
      } else {
        if (!_onParticipantSelectedListeners.some(function(registeredListener) {
            return registeredListener.name === listener.name;
          })) {
          _onParticipantSelectedListeners.push(listener);
        }
      }
    }

    function filterFunction(registeredListener) {
      return registeredListener.name === listener.name;
    }

    function _notifyEvent(listeners, data, endLoop) {
      for (var listener = 0; listener < endLoop; listener++) {
        listeners[listener](data);
      }
    }
  }
}());
