(function () {
  'use strict';

  angular
    .module('otusjs.stage.repository')
    .service('otusjs.stage.repository.StageRepositoryService', Service);

  Service.$inject = [
    'otusjs.stage.repository.StageCollectionService'
  ];

  function Service(StageCollectionService) {
    const self = this;

    self.getAllStages = getAllStages;


    function getAllStages(){
      return StageCollectionService.getAllStages();
    }

  }
}());



