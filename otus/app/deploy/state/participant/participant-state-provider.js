(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.ParticipantState', Provider);

  Provider.$inject = [
    'STATE'
  ];

  function Provider(STATE) {
    var self = this;

    self.$get = [provider];

    function provider() {
      return self;
    }

    self.state = {
      abstract: true,
      parent: STATE.DASHBOARD,
      name: STATE.PARTICIPANT,
      url: '/' + STATE.PARTICIPANT,
      template: '<div id="participant-state-template" flex ui-view></div>'
    };
  }
}());
