(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.FlagState', Provider);

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
      name: STATE.FLAG_DASHBOARD,
      url: '/' + STATE.FLAG_DASHBOARD,
      template: '<otus-flag-report-dashboard layout="column" flex></otus-flag-report-dashboard>',
      data: {
        redirect: _redirect
      }
    };

    function _resolveUser(SessionContextService, Application) {
      var user = SessionContextService.getData('loggedUser');
      return user;
    }

    function _redirect(SessionContextService, $q, Application) {
      var deferred = $q.defer();

      Application
        .isDeployed()
        .then(function() {
          try {
            SessionContextService.restore();
            deferred.resolve();
          } catch (e) {
            deferred.resolve(STATE.LOGIN);
          }
        });

      return deferred.promise;
    }

    _resolveUser.$inject = [
      'otusjs.application.session.core.ContextService',
      'otusjs.application.core.ModuleService'
    ]

    _redirect.$inject = [
      'otusjs.application.session.core.ContextService',
      '$q',
      'otusjs.application.core.ModuleService'
    ];
  }
}());
