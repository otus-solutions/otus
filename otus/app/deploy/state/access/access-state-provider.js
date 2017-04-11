(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.AccessState', Provider);

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
      name: STATE.ACCESS,
      template: '<div flex layout="column"><div ui-view flex layout="row"></div></div>',
      data: {
        redirect: _redirect
      },
      resolve: {
        applicationReady: _applicationReady
      }
    };

    function _redirect($q, AccessContextService, Application) {
      var deferred = $q.defer();

      Application
        .isDeployed()
        .then(function() {
          try {
            AccessContextService.isValid();
            deferred.resolve();
          } catch (e) {
            deferred.resolve(STATE.DASHBOARD);
          }
        });

      return deferred.promise;
    }

    function _applicationReady(InstallerRestService) {
      InstallerRestService.ready(function(response) {
        if (!response.data) {
          return STATE.INSTALLER;
        } else {
          return STATE.LOGIN;
        }
      });
    }

    _redirect.$inject = [
      '$q',
      'otusjs.user.access.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
    _applicationReady.$inject = [
      'otusjs.deploy.InstallerRestService'
    ];
  }
}());
