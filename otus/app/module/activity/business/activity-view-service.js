(function () {
  'use strict';

  angular
    .module('otusjs.activity.business')
    .service('otusjs.activity.business.ActivityViewService', Service);

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
          _setActivityToView(ActivityFacadeService);
          _setupPlayer(); // TODO:
        });
    }

    function _setActivityToView(ActivityFacadeService) {
      var activityToView = ContextService.getSelectedActivities()[0];
      ActivityFacadeService.useActivity(activityToView);
      ActivityFacadeService.openSurveyActivity(ContextService.getLoggedUser());
      ContextService.setActivityToView(activityToView);
    }

    function _setupPlayer() {
      ModuleService
        .whenActivityPlayerServiceReady()
        .then(function (PlayerService) {
          PlayerService.setup(); // TODO:
        });
    }
  }
}());
