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

    function initialize() {
      _rest = OtusRestResourceService.getUserActivityPendencyResource();
      console.log(_rest);
    }


  }





}());