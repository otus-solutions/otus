(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.SendingExamState', Provider);

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
      parent: STATE.EXAM_DASHBOARD,
      name: STATE.EXAM_SENDING,
      url: '/' + STATE.EXAM_SENDING,
      template: '<otus-view-sending-exam layout="column" flex></otus-view-sending-exam>',
      data: {
        redirect: _redirect
      },
      resolve: {
        stateData: _loadStateData
      }
    };

    function _loadStateData(SessionContextService, ProjectContextService, Application) {
      return Application
        .isDeployed()
        .then(function () {
          try {
            SessionContextService.restore();
            ProjectContextService.restore();
          } catch (e) {
            console.log(e);
          }
        });
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

    _redirect.$inject = [
      '$q',
      'otusjs.application.core.ModuleService'
    ];

    _loadStateData.$inject = [
      'otusjs.application.session.core.ContextService',
      'otusjs.laboratory.core.project.ContextService',
      'otusjs.application.core.ModuleService'
    ];
  }
}());  