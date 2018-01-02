(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.ResultUploadDashboardState', Provider);

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
      name: STATE.RESULT_UPLOAD_DASHBOARD,
      url: '/' + STATE.RESULT_UPLOAD_DASHBOARD,
      template: '<otus-result-upload-dashboard layout="column" flex></otus-result-upload-dashboard>',
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
