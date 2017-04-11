(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.PrePlayerStepService', Service);

  Service.$inject = [
    '$q',
    'otusjs.player.core.player.PlayerService',
    'otusjs.deploy.SurveyItemDatasourceService',
    'otusjs.player.data.activity.ActivityFacadeService',
  ];

  function Service($q, PlayerService, SurveyItemDatasourceService, ActivityFacadeService) {
    var self = this;
    var defer = $q.defer();

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {}

    function effect(pipe, flowData) {
      var dsDefsArray = ActivityFacadeService.getCurrentSurvey().getSurveyDatasources();
      var unlockingPromises = [
         SurveyItemDatasourceService.setupDatasources(dsDefsArray),
         //another promise to solve before unblock phase
      ];
      PlayerService.registerPhaseBlocker($q.all(unlockingPromises));

    }

    function afterEffect(pipe, flowData) {}

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();
