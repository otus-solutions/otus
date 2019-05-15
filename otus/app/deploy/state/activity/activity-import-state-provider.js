(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.ActivityImportState', Provider);

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
      name: STATE.ACTIVITY_IMPORT,
      url: '/' + STATE.ACTIVITY_IMPORT,
      template: '<otus-activity-import layout="column" flex></otus-activity-import>',
      resolve: {
        user: _resolveUserLogged
      },
      data: {
        redirect: _redirect
      }
    };

    function _redirect($q, ActivityContextService, Application) {
      var deferred = $q.defer();

      Application
        .isDeployed()
        .then(function() {
          try {
            deferred.resolve();
            ActivityContextService.restore();
          } catch (e) {
            deferred.resolve(STATE.LOGIN);
          }
        });

      return deferred.promise;
    }

    _redirect.$inject = [
      '$q',
      'otusjs.activity.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];

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
