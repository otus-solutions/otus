(function (){
  'use strict'

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.UserActivityPendencyRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService){
    const UNINITIALIZED_REST_ERROR_MESSAGE = 'REST resource is not initialized.';
    const self = this;
    let _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.create = create;
    self.getPendencyByActivityId = getPendencyByActivityId;

    function initialize() {
      _rest = OtusRestResourceService.getUserActivityPendencyResource();
    }

    function create (jsonPendency){
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.create(jsonPendency).$promise;
    }

    function getPendencyByActivityId(id) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE)
      return _rest.getByActivityId({activityId: id}).$promise;
    }
  }





}());