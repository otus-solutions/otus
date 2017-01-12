(function() {
  'use strict';

  angular
    .module('otusjs.activity')
    .service('otusjs.activity.LocalStorageStepService', Service);

  Service.$inject = [
    'otusjs.activity.core.ModuleService',
    'otusjs.activity.repository.ActivityRepositoryService'
  ]

  function Service(ModuleService, ActivityRepositoryService) {
    var self = this;
    var _currentItem;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) { }

    function effect(pipe, flowData) {
      ModuleService
        .whenActivityFacadeServiceReady()
        .then(function(ActivityFacadeService) {
          ActivityRepositoryService.save(ActivityFacadeService.getActivity());
        });
    }

    function afterEffect(pipe, flowData) {
      console.info('Activity filling saved!');
    }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();
