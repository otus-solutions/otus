(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.LabelMaterialDashboardState', Provider);

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
      name: STATE.LABEL_MATERIAL,
      url: '/' + STATE.LABEL_MATERIAL,
      template: '<label-material-dashboard layout="row" flex=""></label-material-dashboard>',
      data: {
        redirect: _redirect
      }
    };

    function _redirect($q, DashboardContextService, Application, laboratoryContextService) {
      var deferred = $q.defer();
      Application
        .isDeployed()
        .then(function () {
          try {
              DashboardContextService.isValid();
              laboratoryContextService.restore();
              deferred.resolve();
          } catch (e) {
            deferred.resolve(STATE.LOGIN);
          }
        });

      return deferred.promise;
    }

    _redirect.$inject = [
      '$q',
      'otusjs.otus.dashboard.core.ContextService',
      'otusjs.application.core.ModuleService',
      'otusjs.laboratory.core.ContextService'
    ];

  }
}());
