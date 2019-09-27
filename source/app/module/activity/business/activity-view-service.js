(function () {
  'use strict';

  angular
    .module('otusjs.activity.business')
    .service('otusjs.activity.business.ActivityViewService', Service);

  Service.$inject = [
    'otusjs.activity.core.ModuleService',
    'otusjs.activity.core.ContextService',
    'otusjs.activity.business.ParticipantActivityService',
  ];

  function Service(ModuleService, ContextService, ParticipantActivityService) {
    var activityToView = null;
    var self = this;

    /* Public methods */
    self.load = load;

    function load() {
      activityToView = null;
      var _activity = ContextService.getSelectedActivities()[0];
      return ParticipantActivityService.getById(_activity).then(function (response) {
        if (Array.isArray(response)) {
          if (response.length > 0) {
            activityToView = angular.copy(response[0]);
          }
        }

        return ModuleService

          .whenActivityFacadeServiceReady()
          .then(function (ActivityFacadeService) {
            _setActivityToViewer(ActivityFacadeService);
          });

      });
    }

    function _setActivityToViewer(ActivityFacadeService) {
      ContextService.selectActivities([activityToView]);
      ActivityFacadeService.useActivity(activityToView);
      ContextService.setActivityToPlay(activityToView);
    }

  }
}());
