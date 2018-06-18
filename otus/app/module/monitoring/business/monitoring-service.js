(function () {
  'use strict';

  angular
    .module('otusjs.monitoring.business')
    .service('otusjs.monitoring.business.MonitoringService', service);

  service.$inject = [
    'otusjs.monitoring.repository.MonitoringCollectionService'
  ];

  function service(MonitoringCollectionService) {
    var self = this;

    self.list = list;
    self.getActivityMonitoring = getActivityMonitoring;


    function list(){
      return MonitoringCollectionService.list();
    }

    function getActivityMonitoring(acronym) {
      return MonitoringCollectionService.find({acronym:acronym});
    }
  }

}());
