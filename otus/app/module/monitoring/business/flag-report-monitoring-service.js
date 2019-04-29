(function () {
  'use strict';

  angular
    .module('otusjs.monitoring.business')
    .service('otusjs.monitoring.business.FlagReportMonitoringService', service);

  service.$inject = [
    'otusjs.monitoring.repository.MonitoringCollectionService'
  ];

  function service(MonitoringCollectionService) {
    var self = this;

    self.find = find;
    self.listAcronyms = listAcronyms;
    self.listCenters = listCenters;
    self.getActivitiesProgressReport = getActivitiesProgressReport;
    self.getExamsName = getExamsName;
    self.getExamsProgressReport = getExamsProgressReport;

    function find(acronym) {
      return MonitoringCollectionService.find({ acronym: acronym });
    }

    function listAcronyms() {
      return MonitoringCollectionService.listAcronyms();
    }

    function listCenters() {
      return MonitoringCollectionService.listCenters();
    }

    function getActivitiesProgressReport(center) {
      return MonitoringCollectionService.getActivitiesProgressReport({ center: center });
    }

    function getExamsName() {
      return MonitoringCollectionService.getExamsName();
    }

    function getExamsProgressReport(center) {
      return MonitoringCollectionService.getExamsProgressReport({ center: center });
    }

  }

}());
