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
      parent: STATE.EXAM_DASHBOARD,
      name: STATE.EXAM_LOT_INFO_MANAGER,
      url: '/' + STATE.EXAM_LOT_INFO_MANAGER,
      template: '<otus-exam-lot-info-manager state-data="$resolve.stateData" layout="column" flex></otus-exam-lot-info-manager>',
      resolve:{
        stateData: _loadStateData
      }
    };


    function _loadStateData($q, LaboratoryConfigurationService, SessionContextService, LaboratoryContextService, Application) {
      var defer = $q.defer();
      Application
        .isDeployed()
        .then(function() {
          try {
            LaboratoryConfigurationService.getLaboratoryDescriptors().then(() => {
              SessionContextService.restore();
              LaboratoryContextService.restore();
              var _stateData = [];
              _stateData['selectedLot'] = LaboratoryContextService.getSelectedExamLot();
              _stateData['user'] = SessionContextService.getData('loggedUser');
              defer.resolve(_stateData);
            });
          } catch (e) {
            console.log(e);
          }
        });
      return defer.promise;
    }

    _loadStateData.$inject = [
      '$q',
      'otusjs.laboratory.business.configuration.LaboratoryConfigurationService',
      'otusjs.application.session.core.ContextService',
      'otusjs.laboratory.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];

  }
}());
