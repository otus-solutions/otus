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
    self.getSharedLink = getSharedLink;

    function initialize() {
      _rest = OtusRestResourceService.getActivitySharingResourceFactory();
    }

    function getSharedLink(activityId){
      return _rest.getSharedURL({ id: activityId }).$promise;
    }
  }

}());