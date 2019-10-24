(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.SessionState', Provider);

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
      name: STATE.SESSION,
      template: '<div flex layout="column"><div flex layout="row" ui-view></div></div>',
      data: {
        redirect: _redirect
      },
      resolve: {
        loadContext: _loadContext
      },
      onExit: _onExit
    };

    function _redirect(SessionContextService, Application) {
      Application
        .isDeployed()
        .then(function() {
          try {
            SessionContextService.isValid();
          } catch (e) {
            return STATE.LOGIN;
          }
        });
    }

    function _loadContext(SessionContextService, Application) {
      Application
        .isDeployed()
        .then(function() {
          try {
            SessionContextService.restore();
          } catch (e) {
            return STATE.LOGIN;
          }
        });
    }

    function _onExit(SessionContextService, Application) {
      Application
        .isDeployed()
        .then(function() {
          try {
            SessionContextService.isValid();
          } catch (e) {
            SessionContextService.end();
          }
        });
    }

    _redirect.$inject = [
      'otusjs.application.session.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
    _loadContext.$inject = [
      'otusjs.application.session.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
    _onExit.$inject = [
      'otusjs.application.session.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
  }
}());
