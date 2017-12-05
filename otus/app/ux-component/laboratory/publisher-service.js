(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.otus.uxComponent.Publisher', Service);

  function Service() {
    var self = this;
    
    self._channels = [];
    self.subscribe = subscribe;
    self.publish = publish;
    self.unsubscribe = unsubscribe;
    self.clearAllSubscriptions = clearAllSubscriptions;
    
    
    function _findChannel(channel) {
      return self._channels.find(function (cn) { return cn.channel === channel });
    }

    function _removeChannel(channel) {
      var channels = self._channels.filter(function (cn) { return cn.channel !== channel });
      self._channels = channels;
    }

    function subscribe(channel, callback) {
      var tmpChannel = _findChannel(channel);

      if (tmpChannel) {
        tmpChannel.callbackFunctions.push(callback);
      } else {
        tmpChannel = {
          channel: channel,
          callbackFunctions: [callback]
        };

        self._channels.push(tmpChannel);
      }
    }

    function publish(channel, data) {
      var tmpChannel = _findChannel(channel);

      if (tmpChannel) {
        tmpChannel.callbackFunctions.forEach(function (callback) {
          callback(data);
        }, this);
      }
    };

    function unsubscribe(channel) {
      _removeChannel(channel);
    };

    
    function clearAllSubscriptions() {
      self._channels = [];
    };
  }
}());
