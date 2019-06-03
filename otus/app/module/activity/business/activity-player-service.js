(function () {
  'use strict';

  angular
    .module('otusjs.activity.business')
    .service('otusjs.activity.business.ActivityPlayerService', Service);

  Service.$inject = [
    'otusjs.activity.core.ModuleService',
    'otusjs.activity.core.ContextService'
  ];

  function Service(ModuleService, ContextService) {
    var self = this;

    /* Public methods */
    self.load = load;

    function load() {
      return ModuleService
        .whenActivityFacadeServiceReady()
        .then(function (ActivityFacadeService) {
          _setActivityToPlay(ActivityFacadeService);
          _setupPlayer();
        });
    }

    function _setActivityToPlay(ActivityFacadeService) {
      var activityToPlay = ContextService.getSelectedActivities()[0];
      ActivityFacadeService.useActivity(activityToPlay);
      ActivityFacadeService.openSurveyActivity(ContextService.getLoggedUser());
      ContextService.setActivityToPlay(activityToPlay);
    }

    function _setupPlayer() {
      ModuleService
        .whenActivityPlayerServiceReady()
        .then(function (PlayerService) {
          PlayerService.setup();
        });
    }
  }
}());
