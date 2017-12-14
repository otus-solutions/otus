(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.ExamLotDashboardState', Provider);

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
      name: STATE.EXAM_LOT_DASHBOARD,
      url: '/' + STATE.EXAM_LOT_DASHBOARD,
      template: '<otus-exam-lot-dashboard layout="column" flex></otus-exam-lot-dashboard>',
      data: {
        redirect: _redirect
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

    _redirect.$inject = [
      '$q',
      'otusjs.application.core.ModuleService'
    ];
  }
}());
