(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.SampleTransportState', Provider);

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
      parent: STATE.SESSION,
      name: STATE.SAMPLE_TRANSPORT,
      url: '/' + STATE.SAMPLE_TRANSPORT,
      template: '<sample-transport-dashboard layout="column" flex></sample-transport-dashboard>'
    };
  }
}());
