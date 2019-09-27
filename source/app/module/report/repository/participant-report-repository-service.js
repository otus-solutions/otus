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

    function getParticipantReportList(rn) {
      return ParticipantReportCollectionService.getParticipantReportList(rn);
    }

    function getFullReport(rn, id) {
      return ParticipantReportCollectionService.getFullReport(rn, id);
    }
  }
}());
