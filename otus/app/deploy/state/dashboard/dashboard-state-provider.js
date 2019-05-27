(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.DashboardState', Provider);

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
      name: STATE.DASHBOARD,
      url: '/' + STATE.DASHBOARD,
      template: '<otus-dashboard layout="column" flex></otus-dashboard>',
      data: {
        redirect: _redirect,
      },
    };

    function _redirect($q, DashboardContextService, Application) {
      var deferred = $q.defer();
      Application
        .isDeployed()
        .then(function () {
          try {
            DashboardContextService.isValid();
            deferred.resolve();
          } catch (e) {
            deferred.resolve(STATE.LOGIN);
          }
        });

      return deferred.promise;
    }

    _redirect.$inject = [
      '$q',
      'otusjs.otus.dashboard.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];

  }
}());
