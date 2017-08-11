(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.SampleTransportationLotAdderState', Provider);

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
      parent: STATE.SAMPLE_TRANSPORTATION_DASHBOARD,
      name: STATE.SAMPLE_TRANSPORTATION_LOT_INFO_MANAGER,
      url: '/' + STATE.SAMPLE_TRANSPORTATION_LOT_INFO_MANAGER,
      template: '<otus-sample-transportation-lot-info-manager lots="$resolve.lots" selected-lot="$resolve.selectedLot" layout="column" flex></otus-sample-transportation-lot-info-manager>',
      resolve:{
        selectedLot: _loadStateData,
        lots: _resolveLots
      }
    };

    function _resolveLots(AliquotTransportationService) {
      return AliquotTransportationService.loadLots();
    }

    _resolveLots.$inject = [
      'otusjs.laboratory.business.project.transportation.AliquotTransportationService'
    ];

    function _loadStateData(LaboratoryContextService, SessionContextService, Application) {
      return Application
        .isDeployed()
        .then(function() {
          try {
            LaboratoryContextService.restore();
            return LaboratoryContextService.getSelectedLot();
          } catch (e) {
            console.log(e);
          }
        });
    }

    _loadStateData.$inject = [
      'otusjs.laboratory.core.ContextService',
      'otusjs.application.session.core.ContextService',
      'otusjs.application.core.ModuleService'
    ];

  }
}());
