(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.MaterialLabelDashboardState', Provider);

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
      name: STATE.MATERIAL_LABEL,
      url: '/' + STATE.MATERIAL_LABEL,
      template: '<material-label-dashboard layout="row" flex=""></material-label-dashboard>',
      data: {
        redirect: _redirect
      },
      resolve: {
        loadStateData: _loadStateData
      }
    };

    function _redirect($q, LaboratoryContextService, Application) {
      var deferred = $q.defer();
      return Application
        .isDeployed()
        .then(function () {
          try {
              LaboratoryContextService.isValid();
              deferred.resolve();
          } catch (e) {
            deferred.resolve(STATE.LOGIN);
          }
        });
    }

    function _loadStateData(ParticipantContextService, SessionContextService, Application) {
      return Application
        .isDeployed()
        .then(function () {
          try {
            SessionContextService.restore();
            laboratoryContextService.restore();
            var user = SessionContextService.getData('loggedUser');
            return user
          } catch (e) {
            console.log(e);
            return STATE.ERROR;
          }
        });
    }


    _redirect.$inject = [
      '$q',
      'otusjs.laboratory.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];

    _loadStateData.$inject = [
      'otusjs.participant.core.ContextService',
      'otusjs.application.session.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
  }
}());
