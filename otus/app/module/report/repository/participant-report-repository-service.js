(function() {
  'use strict';

  angular
    .module('otusjs.report.repository')
    .service('otusjs.report.repository.ParticipantReportRepositoryService', Service);

  Service.$inject = [
    'otusjs.report.repository.ParticipantReportCollectionService'
  ];

  function Service(ParticipantReportCollectionService) {
    var self = this;

    //Participant Report Methods
    self.getParticipantReportList = getParticipantReportList;
    self.getFullReport = getFullReport;
    self.getActivityReport = getActivityReport;


    function getParticipantReportList(rn) {
      return ParticipantReportCollectionService.getParticipantReportList(rn);
    }

    function getActivityReport(rn, activityID) {
      return ParticipantReportCollectionService.getActivityReport(rn,activityID);
    }

    function getFullReport(rn, id) {
      return ParticipantReportCollectionService.getFullReport(rn, id);
    }
  }
}());
