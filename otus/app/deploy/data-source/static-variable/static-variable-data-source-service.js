(function () {
  'use strict';

  angular
    .module('otusjs.deploy.staticVariable')
    .service('otusjs.deploy.staticVariable.StaticVariableDataSourceService', service);

  service.$inject = [
    'otusjs.deploy.staticVariable.StaticVariableDataSourceRequestFactory',
    'otusjs.participant.business.ParticipantManagerService'
  ];

  function service(StaticVariableDataSourceRequestFactory, ParticipantManagerService) {
    var self = this;

    /* Public Interface */
    self.up = up;
    self.setup = setup;

    function up() {

      // StaticVariableRestService.initialize();

    }

    function setup(ActivityFacadeService) {
      var variables = ActivityFacadeService.getCurrentSurvey().getStaticVariableList();
      var participant = ParticipantManagerService.getSelectedParticipante();
      var request = StaticVariableDataSourceRequestFactory.create(participant.recruitmentNumber, variables);
      console.log(request);
      // return StaticVariableRestService.get(request);
    }

  }
}());
