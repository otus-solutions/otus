(function() {
  'use strict';

  angular
    .module('otusjs.user.core')
    .service('otusjs.user.core.EventService', Service);

  function Service() {
    var self = this;

    var _onUserAuthenticationListeners = [];
    var _onUserIndexersLoaded = [];
    var _onUserDataSourceProvidedListeners = [];
    var _onLoginProxyProvidedListeners = [];
    var _onUserAuthenticationListeners = [];

    function _notifyEvent(listeners, data, endLoop) {
      for (var listener = 0; listener < endLoop; listener++) {
        listeners[listener](data);
      }
    }

    //--------------------------------------------------------------------------------------------
    // Output events
    //--------------------------------------------------------------------------------------------
    self.fireUserIndexersLoaded = fireUserIndexersLoaded;
    self.onUserIndexersLoaded = onUserIndexersLoaded;
    self.fireUsersResquet = fireUsersResquet;
    self.onUserAuthentication = onUserAuthentication;
    self.fireUserDataSourceProvided = fireUserDataSourceProvided;
    self.onUserDataSourceProvided = onUserDataSourceProvided;
    self.fireLoginProxyProvided = fireLoginProxyProvided;
    self.onLoginProxyProvided = onLoginProxyProvided;
    self.fireUserAuthentication = fireUserAuthentication;
    self.onUserAuthentication = onUserAuthentication;

    function fireUserIndexersLoaded(data) {
      _notifyEvent(_onUserIndexersLoaded, data, _onUserIndexersLoaded.length);
    }

    function onUserIndexersLoaded(listener) {
      _onUserIndexersLoaded.push(listener);
    }

    function fireUsersResquet(data) {
      _notifyEvent(_onUserAuthenticationListeners, data, _onUserAuthenticationListeners.length);
    }

    function onUserAuthentication(listener) {
      _onUserAuthenticationListeners.push(listener);
    }

    function fireUserDataSourceProvided(dataSource) {
      _notifyEvent(_onUserDataSourceProvidedListeners, dataSource, _onUserDataSourceProvidedListeners.length);
    }

    function onUserDataSourceProvided(listener) {
      _onUserDataSourceProvidedListeners.push(listener);
    }

    function fireLoginProxyProvided(data) {
      _notifyEvent(_onLoginProxyProvidedListeners, data, _onLoginProxyProvidedListeners.length);
    }

    function onLoginProxyProvided(listener) {
      _onLoginProxyProvidedListeners.push(listener);
    }

    function fireUserAuthentication(data) {
      _notifyEvent(_onUserAuthenticationListeners, data, _onUserAuthenticationListeners.length);
    }

    function onUserAuthentication(listener) {
      _onUserAuthenticationListeners.push(listener);
    }
  }
}());
