(function() {
  'use strict';

  angular
    .module('otusjs.user.comment.core')
    .service('otusjs.user.comment.core.EventService', Service);

  function Service() {
    var self = this;

    let _onLogoutListeners = {};

    /* Public methods */
    self.onLogout = onLogout;
    self.fireLogout = fireLogout;

    function fireLogout(data) {
      _notifyEventObj(_onLogoutListeners, data);
    }

    function onLogout(listener) {
      Object.assign(_onLogoutListeners, listener);
    }

    function _notifyEventObj(listeners, data) {
      for (var listener in listeners) {
        listeners[listener](data);
      }
    }
  }
}());
