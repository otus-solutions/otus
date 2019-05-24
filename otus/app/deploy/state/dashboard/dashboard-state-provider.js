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
      template: '<span="column" flex>state</span>',
      data: {
        redirect: _redirect,
        userPermission: _userPermission
      }
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

    function _userPermission($q, Application, UserAccessPermissionService, SessionContextService) {
      var defer = $q.defer();
      Application
        .isDeployed()
        .then(function () {
          try {
            SessionContextService.restore();
            var _stateData = SessionContextService.getData('loggedUser');
            UserAccessPermissionService.getAllPermission(_stateData.email).then((response) => {
              console.log(response);
            });
          } catch (e) {
            console.log(e);
          }
        });
      return defer.promise;
    }

    _userPermission.$inject = [
      '$q',
      'otusjs.application.core.ModuleService',
      'otusjs.deploy.user.UserAccessPermissionService',
      'otusjs.application.session.core.ContextService'
    ];

    _redirect.$inject = [
      '$q',
      'otusjs.otus.dashboard.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];

  }
}());
