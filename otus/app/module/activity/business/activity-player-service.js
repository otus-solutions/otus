(function () {
  'use strict';

  angular
    .module('otusjs.activity.business')
    .service('otusjs.activity.business.ActivityPlayerService', Service);

  Service.$inject = [
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.activity.core.ModuleService',
    'otusjs.activity.core.ContextService'
  ];

  function Service(ParticipantActivityService, ModuleService, ContextService) {
    var self = this;

    var activityToPlay = null;

    /* Public methods */
    self.load = load;

    function load() {
      activityToPlay = null;
      var _activity = ContextService.getSelectedActivities()[0];
      return ParticipantActivityService.getById(_activity).then(function (response) {
        if (Array.isArray(response)) {
          if (response.length > 0) {
            activityToPlay = angular.copy(response[0]);
          }
        }

        return ModuleService
          .whenActivityFacadeServiceReady()
          .then(function (ActivityFacadeService) {
            _setActivityToPlay(ActivityFacadeService);
          });

      });
    }

    function _setActivityToPlay(ActivityFacadeService) {
      ContextService.selectActivities([activityToPlay]);
      ActivityFacadeService.useActivity(activityToPlay);
      ActivityFacadeService.openSurveyActivity(ContextService.getLoggedUser());
      ContextService.setActivityToPlay(activityToPlay);
      _setupPlayer();
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
