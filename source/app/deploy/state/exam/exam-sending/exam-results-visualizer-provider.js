(function () {
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
      parent: STATE.EXAM_SENDING,
      name: STATE.EXAM_RESULT_VISUALIZER,
      url: '/' + STATE.EXAM_RESULT_VISUALIZER,
      template: '<otus-result-visualizer layout="column" flex></otus-result-visualizer>',
      data: {
        redirect: _redirect
      },
      resolve: {
        laboratory: _laboratory
      }
    };

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

    function _laboratory($q, LaboratoryConfigurationService) {
      var deferred = $q.defer();

      try {
        LaboratoryConfigurationService.getLaboratoryDescriptors().then(() => {
          deferred.resolve();
        });
      } catch (e) {
        deferred.resolve({});
      }


      return deferred.promise;
    }

    _laboratory.$inject = [
      '$q',
      'otusjs.laboratory.business.configuration.LaboratoryConfigurationService'
    ];

    _redirect.$inject = [
      '$q',
      'otusjs.application.core.ModuleService'
    ];
  }
}());
