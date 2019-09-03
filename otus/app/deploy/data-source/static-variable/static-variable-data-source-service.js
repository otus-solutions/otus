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
      return $q(function (resolve, reject) {
        try {
          var currentSurvey = ActivityFacadeService.getCurrentSurvey().getSurvey();
          var variables = currentSurvey.getStaticVariableList();
          if (!variables || !variables.length) {
            resolve([]);
          }
          else{
            var participant = ParticipantManagerService.getSelectedParticipant();
            var request = StaticVariableDataSourceRequestFactory.create(participant.recruitmentNumber, variables);
            StaticVariableRestService.getParticipantStaticVariable(request)
              .then(response => {
                if (response.variables) {
                  resolve(currentSurvey.fillStaticVariablesValues(response.variables));
                }
              })
              .catch(function (e) {
                reject(e);
              });
          }
        } catch (e) {
          reject(e);
        }
      });
    }

  }
}());
