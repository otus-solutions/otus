(function () {
  'use strict';

  angular
    .module('otusjs.deploy.rest')
    .service('otusjs.deploy.StageRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    let self = this;
    let _rest = null;

    self.initialize = initialize;
    self.getAllStages = getAllStages;

    function initialize() {
      _rest = OtusRestResourceService.getStageResourceFactory();
    }

    function getAllStages(){
      _checkRest();
      return _rest.getAll().$promise;
    }


    function _checkRest(){
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
    }
  }
});