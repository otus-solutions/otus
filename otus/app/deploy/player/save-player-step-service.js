(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.SavePlayerStepService', Service);

  Service.$inject = [
    'otusjs.application.state.ApplicationStateService',
    'otusjs.activity.core.ModuleService',
    'otusjs.activity.repository.ActivityRepositoryService'
  ];

  function Service(ApplicationStateService, ActivityModuleService, ActivityRepositoryService) {
    var self = this;
    var _currentItem;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {}

    function effect(pipe, flowData) {
      ActivityModuleService
        .whenActivityFacadeServiceReady()
        .then(function(ActivityFacadeService) {
          ActivityRepositoryService
            .save(ActivityFacadeService.getActivity())
            .then(ApplicationStateService.activateParticipantActivities);
        });
    }

    function afterEffect(pipe, flowData) {}

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();
