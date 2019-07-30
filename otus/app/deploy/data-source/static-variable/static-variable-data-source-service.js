(function () {
  'use strict';

  angular
    .module('otusjs.deploy.staticVariable')
    .service('otusjs.deploy.staticVariable.StaticVariableDataSourceService', service);

  service.$inject = [
    '$q',
    'otusjs.deploy.StaticVariableRestService',
    'otusjs.deploy.staticVariable.StaticVariableDataSourceRequestFactory',
    'otusjs.participant.business.ParticipantManagerService'
  ];

  function service($q, StaticVariableRestService, StaticVariableDataSourceRequestFactory, ParticipantManagerService) {
    var self = this;

    /* Public Interface */
    self.up = up;
    self.setup = setup;

    function up() {
      var defer = $q.defer();
      StaticVariableRestService.initialize();
      defer.resolve(true);
      return defer.promise;
    }

    function setup(ActivityFacadeService) {
      var currentSurvey = ActivityFacadeService.getCurrentSurvey().getSurvey();
      var variables = currentSurvey.getStaticVariableList();
      var participant = ParticipantManagerService.getSelectedParticipante();
      var request = StaticVariableDataSourceRequestFactory.create(participant.recruitmentNumber, variables);
      return StaticVariableRestService.getParticipantStaticVariable(request)
        .then(response => {
          if (response.variables) {
            currentSurvey.fillStaticVariablesValues(response.variables);
          }
          return response.variables;
        });
    }

  }
}());
