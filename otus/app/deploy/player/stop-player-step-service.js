(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.StopPlayerStepService', Service);

  Service.$inject = [
    'otusjs.application.state.ApplicationStateService'
  ];

  function Service(ApplicationStateService) {
    var self = this;
    var _currentItem;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) { }

    function effect(pipe, flowData) {
      ApplicationStateService.activateParticipantActivities();
    }

    function afterEffect(pipe, flowData) {
    }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();
