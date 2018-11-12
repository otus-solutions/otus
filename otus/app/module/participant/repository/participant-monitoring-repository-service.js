(function () {
  'use strict';

  angular
    .module('otusjs.participant.repository')
    .service('otusjs.participant.repository.ParticipantMonitoringRepositoryService', Service);

  Service.$inject = [
    'otusjs.participant.repository.ParticipantMonitoringCollectionService'
  ];

  function Service(ParticipantMonitoringCollectionService) {
    var self = this;

    /* Public methods */
    self.getStatusOfSurveys = getStatusOfSurveys;
    self.defineSurveyWithUnnecessary = defineSurveyWithUnnecessary;

    function getStatusOfSurveys(recruitmentNumber) {
      return ParticipantMonitoringCollectionService.getStatusOfSurveys(recruitmentNumber);
    }

    function defineSurveyWithUnnecessary(data) {
      return ParticipantMonitoringCollectionService.defineSurveyWithUnnecessary(data);
    }
  }
}());
