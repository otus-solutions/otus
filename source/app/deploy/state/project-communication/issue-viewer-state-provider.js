(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.IssueViewerState', Provider);

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
      name: STATE.ISSUE_VIEWER,
      url: '/' + STATE.ISSUE_VIEWER,
      template: '<issue-viewer-component></issue-viewer-component>',
      resolve: {
        resolve: _resolve
      },
      data: {
        redirect: _redirect
      }
    };

    function _resolve($q, Application, SessionContextService, DashboardContextService) {
      var deferred = $q.defer();

      Application.isDeployed()
        .then(function () {
          try {
            DashboardContextService.restore();
            SessionContextService.restore();
            deferred.resolve();
          } catch (e) {
            deferred.resolve(STATE.LOGIN);
          }
        });

      return deferred.promise;
    }

    function _redirect($q, Application) {
      var deferred = $q.defer();

      Application
        .isDeployed()
        .then(function () {
          try {
            deferred.resolve();
          } catch (e) {
            deferred.resolve(STATE.LOGIN);
          }
        });

      return deferred.promise;
    }

    _resolve.$inject = [
      '$q',
      'otusjs.application.core.ModuleService',
      'otusjs.application.session.core.ContextService',
      'otusjs.otus.dashboard.core.ContextService'
    ]

    _redirect.$inject = [
      '$q',
      'otusjs.application.core.ModuleService'
    ];
  }
}());