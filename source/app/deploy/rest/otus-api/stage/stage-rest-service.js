(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
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
        throw new Error('StageRestService resource is not initialized.');
      }
    }
  }
})();