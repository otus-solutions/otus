(function(){
  'use strict';

  angular
    .module('otusjs.stage.business')
    .service('otusjs.stage.business.StageService', Service);

  Service.$inject = [
    'otusjs.stage.repository.StageRepositoryService'
  ];

  function Service (StageRepositoryService){
    const self = this;

    self.getAllStages = getAllStages;


    function getAllStages() {
      return StageRepositoryService.getAllStages();
    }

  }

}());