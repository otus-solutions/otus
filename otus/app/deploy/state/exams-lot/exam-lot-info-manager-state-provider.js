(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.ExamLotInfoManagerState', Provider);

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
      parent: STATE.EXAMS_LOTS_DASHBOARD,
      name: STATE.EXAM_LOT_INFO_MANAGER,
      url: '/' + STATE.EXAM_LOT_INFO_MANAGER,
      template: '<otus-exam-lot-info-manager lots="$resolve.lots" state-data="$resolve.stateData" layout="column" flex></otus-exam-lot-info-manager>',
      resolve:{
        stateData: _loadStateData,
        lots: _resolveLots
      }
    };

    function _resolveLots(AliquotTransportationService) {
      return AliquotTransportationService.getLots();
    }

    function _loadStateData(SessionContextService, LaboratoryContextService, Application) {
      return Application
        .isDeployed()
        .then(function() {
          try {
            SessionContextService.restore();
            LaboratoryContextService.restore();
            var _stateData = [];
            _stateData['selectedLot'] = LaboratoryContextService.getSelectedLot();
            _stateData['user'] = SessionContextService.getData('loggedUser');
            return _stateData;
          } catch (e) {
            console.log(e);
          }
        });
    }

    _resolveLots.$inject = [
      'otusjs.laboratory.business.project.transportation.AliquotTransportationService'
    ];

    _loadStateData.$inject = [
      'otusjs.application.session.core.ContextService',
      'otusjs.laboratory.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];

  }
}());
