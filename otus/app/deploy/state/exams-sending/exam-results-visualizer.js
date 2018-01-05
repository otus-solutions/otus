(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.ExamResultsVisualizer', Provider);

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
      name: STATE.EXAM_RESULT_VISUALIZER,
      url: '/' + STATE.EXAM_RESULT_VISUALIZER,
      template: '<otus-result-visualizer layout="column" flex></otus-result-visualizer>',
      data: {
        redirect: _redirect
      },
      resolve:{
        stateData: _loadStateData
      }
    };

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

    function _loadStateData(SessionContextService, ContextService, Application) {
      return Application
        .isDeployed()
        .then(function() {
          try {
            SessionContextService.restore();
            ContextService.restore();
          } catch (e) {
            console.log(e);
          }
        });
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
