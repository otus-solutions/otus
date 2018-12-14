(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.ExamLotManagerListState', Provider);

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
      name: STATE.EXAM_LOT_MANAGER_LIST,
      url: '/' + STATE.EXAM_LOT_MANAGER_LIST,
      template: '<otus-exams-lots-manager lots="$resolve.lots" layout="column" flex></otus-exams-lots-manager>',
      resolve:{
        stateData: _loadStateData
      }
    };

    function _loadStateData(SessionContextService, LaboratoryContextService, Application) {
      return Application
        .isDeployed()
        .then(function() {
          try {
            SessionContextService.restore();
            LaboratoryContextService.restore();
          } catch (e) {
            console.log(e);
          }
        });
    }

    _loadStateData.$inject = [
      'otusjs.application.session.core.ContextService',
      'otusjs.laboratory.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];
  }
}());
