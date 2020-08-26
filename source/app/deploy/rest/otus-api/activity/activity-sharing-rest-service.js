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
    self.getSharedURL = getSharedURL;

    function initialize() {
      _rest = OtusRestResourceService.getActivitySharingResourceFactory();
    }

    function getSharedURL(activityId){
      return _rest.getSharedURL({ id: activityId }).$promise;
    }
  }

}());