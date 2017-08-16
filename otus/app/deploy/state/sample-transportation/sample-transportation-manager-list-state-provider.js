(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.SampleTransportationManagerListState', Provider);

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
      parent: STATE.SAMPLE_TRANSPORTATION_DASHBOARD,
      name: STATE.SAMPLE_TRANSPORTATION_MANAGER_LIST,
      url: '/' + STATE.SAMPLE_TRANSPORTATION_MANAGER_LIST,
      template: '<otus-sample-transportation-manager-list lots="$resolve.lots" layout="column" flex></otus-sample-transportation-manager-list>',
      resolve:{
        lots: _resolveLots
      }
    };

    function _resolveLots(AliquotTransportationService) {
      return AliquotTransportationService.getLots();
    }

    _resolveLots.$inject = [
      'otusjs.laboratory.business.project.transportation.AliquotTransportationService'
    ];
  }
}());
