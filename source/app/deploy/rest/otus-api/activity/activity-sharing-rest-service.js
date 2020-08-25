(function () {
  'use strict';

  angular
    .module('otusjs.deploy.rest')
    .service('otusjs.deploy.ActivitySharingRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService){
    const self = this;
    let _rest = null;

    self.initialize = initialize;

    function initialize() {
      // _rest = OtusRestResourceService.get.ActivitySharingResource();
    }
  }

}());