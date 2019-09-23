(function () {
  'use strict';

  angular
    .module('otusjs.report.business')
    .service('otusjs.report.business.ParticipantReportService', service);

  service.$inject = [
    'otusjs.report.repository.ParticipantReportRepositoryService'
  ];

  function service(ParticipantReportRepositoryService) {
    var self = this;

    self.fetchReportList = fetchReportList;
    self.getFullReport = getFullReport;

    function fetchReportList(participant) {
      return ParticipantReportRepositoryService.getParticipantReportList(participant.recruitmentNumber);
    }

    function getFullReport(participant, reportId) {
      return ParticipantReportRepositoryService.getFullReport(participant.recruitmentNumber, reportId);
    }
  }
}());
