(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.FlagManagerState', Provider);

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
      parent: STATE.FLAG_DASHBOARD,
      name: STATE.FLAG_MANAGER_LIST,
      url: '/' + STATE.FLAG_MANAGER_LIST,
      template: '<otus-flag-report-manager layout="column" user="$user" flex></otus-flag-report-manager>',
      resolve: {
        user: _resolveUserLogged
      }
    };

    function _resolveUserLogged(SessionContextService, Application) {
      return Application
        .isDeployed()
        .then(function() {
          try {
            SessionContextService.restore();
            var user = SessionContextService.getData('loggedUser');
            return user;
          } catch (e) {
            console.log(e);
          }
        });
      }

    _resolveUserLogged.$inject = [
      'otusjs.application.session.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
  }
}());
