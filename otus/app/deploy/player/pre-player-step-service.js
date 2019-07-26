(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.PrePlayerStepService', Service);

  Service.$inject = [
    '$q',
    'otusjs.player.core.player.PlayerService',
    'otusjs.deploy.SurveyItemDatasourceService',
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.deploy.FileUploadDatasourceService',
    'otusjs.deploy.staticVariable.SurveyItemStaticVariableService'
  ];

  function Service($q, PlayerService, SurveyItemDatasourceService, ActivityFacadeService, FileUploadDatasourceService, SurveyItemStaticVariableService) {
    var self = this;
    var defer = $q.defer();

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) { }

    function effect(pipe, flowData) {
      // TODO: variaveis devem ser atribuitadas ao participante e então preenchidas com informações vindas do otus-api
      var dsDefsArray = ActivityFacadeService.getCurrentSurvey().getSurveyDatasources();
      var unlockingPromises = [
        SurveyItemDatasourceService.setupDatasources(dsDefsArray),
        FileUploadDatasourceService.setupUploader(),        
        //another promise to solve before unblock phase
      ];
      // TODO: chamado para o player sem bloqueio
      PlayerService.registerPhaseBlocker($q.all(unlockingPromises));
      SurveyItemStaticVariableService.setup(ActivityFacadeService);
    }

    function afterEffect(pipe, flowData) { }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();
