(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.SampleTransportLotAdderState', Provider);

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
      parent: STATE.SAMPLE_TRANSPORT_DASHBOARD,
      name: STATE.SAMPLE_TRANSPORT_LOT_ADDER,
      url: '/' + STATE.SAMPLE_TRANSPORT_LOT_ADDER,
      template: '<otus-paper-activity-adder layout="column" flex></otus-paper-activity-adder>',
    };
  }
}());
