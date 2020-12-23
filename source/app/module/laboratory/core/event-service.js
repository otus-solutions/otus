(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.core')
    .service('otusjs.laboratory.core.EventService', Service);

  function Service() {
    var self = this;

    var _onParticipantSelectedListeners = {};
    var _onLabCreatedListeners = [];

    /* Public methods */
    self.fireParticipantSelected = fireParticipantSelected;
    self.onParticipantSelected = onParticipantSelected;
    self.onLabCreated = onLabCreated;
    self.fireOnLabCreated = fireOnLabCreated;

    function onLabCreated(listener) {
      _onLabCreatedListeners.push(listener)
    }

    function fireOnLabCreated(data) {
      _notifyEvent(_onLabCreatedListeners, data, _onLabCreatedListeners.length);
    }

    function fireParticipantSelected(data) {
      _notifyEventObj(_onParticipantSelectedListeners, data, _onParticipantSelectedListeners.length);
    }

    function onParticipantSelected(listener) {
      var listenerName = listener.name;
      _onParticipantSelectedListeners[listenerName] = listener;
    }

    function _notifyEvent(listeners, data, endLoop) {
      for (var listener = 0; listener < endLoop; listener++) {
        listeners[listener](data);
      }
    }

    function _notifyEventObj(listeners, data, endLoop) {
      for (var listener in listeners) {
        listeners[listener](data);
      }
    }
  }
}());
