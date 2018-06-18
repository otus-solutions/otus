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

    self.find = find;
    self.listAcronyms = listAcronyms;


    function find(acronym){
      return MonitoringCollectionService.find({acronym:acronym});
    }

    function listAcronyms(){
      return MonitoringCollectionService.listAcronyms();
    }
  }

}());
