(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.SampleTransportationState', Provider);

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
      name: STATE.SAMPLE_TRANSPORTATION_DASHBOARD,
      url: '/' + STATE.SAMPLE_TRANSPORTATION_DASHBOARD,
      template: '<sample-transportation-dashboard lots="$resolve.lots" layout="column" flex></sample-transportation-dashboard>',
      data: {
        redirect: _redirect
      },
      resolve:{
        lots: _resolveLots
      }
    };

    function _resolveLots(AliquotTransportationService) {
      return AliquotTransportationService.loadLots();
    }

    function _redirect($q, Application) {
      var deferred = $q.defer();

      Application
        .isDeployed()
        .then(function() {
          try {
            deferred.resolve();
          } catch (e) {
            deferred.resolve(STATE.LOGIN);
          }
        });

      return deferred.promise;
    }

    _resolveLots.$inject = [
      'otusjs.laboratory.business.project.transportation.AliquotTransportationService'
    ];

    _redirect.$inject = [
      '$q',
      'otusjs.application.core.ModuleService'
    ];
  }
}());