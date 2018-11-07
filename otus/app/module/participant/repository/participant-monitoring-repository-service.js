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
    self.getStatusOfActivities = getStatusOfActivities;
    self.updateObservation = updateObservation;

    function getStatusOfActivities(recruitmentNumber) {
      return ParticipantMonitoringCollectionService.getStatusOfActivities(recruitmentNumber);
    }

    function updateObservation(data) {
      return ParticipantMonitoringCollectionService.updateObservation(data);
    }
  }
}());
