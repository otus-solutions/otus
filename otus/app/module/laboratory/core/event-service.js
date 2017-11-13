(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.core')
    .service('otusjs.laboratory.core.EventService', Service);

  function Service() {
    var self = this;
    
    var _onParticipantSelectedListeners = {};

    /* Public methods */
    self.fireParticipantSelected = fireParticipantSelected;
    self.onParticipantSelected = onParticipantSelected;

    var newChannel = {channel:'', callbackFunctions:[]};

    self.pubSub = {};

    self.pubSub._channels = [];
    
    self.pubSub._findChannel = function(channel){
      return self.pubSub._channels.find(function(cn){ return cn.channel === channel });
    };

    self.pubSub._removeChannel = function(channel){
      var channels = self.pubSub._channels.filter(function(cn){ return cn.channel !== channel });
      self.pubSub._channels = channels;
    };

    self.pubSub.subscribe = function(channel, callback) {
      var tmpChannel = self.pubSub._findChannel(channel);

      if(tmpChannel){
        tmpChannel.callbackFunctions.push(callback);
      } else {
        tmpChannel = {
          channel:channel, 
          callbackFunctions:[callback]
        };

        self.pubSub._channels.push(tmpChannel);
      }
    };

    self.pubSub.publish = function(channel, data){
      var tmpChannel = self.pubSub._findChannel(channel);

      if(tmpChannel){
        tmpChannel.callbackFunctions.forEach(function(cbFunction) {
          cbFunction(data);
        }, this);
      }
    };

    self.pubSub.unsubscribe = function(channel) {
      self.pubSub._removeChannel(channel);
    };

    self.pubSub.clearAllSubscriptions = function() {
      self.pubSub._channels = [];
    };   

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
