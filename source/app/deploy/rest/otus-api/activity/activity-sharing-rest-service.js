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
    self.renovateSharedURL = renovateSharedURL;
    self.deleteSharedURL = deleteSharedURL;

    function initialize() {
      _rest = OtusRestResourceService.getActivitySharingResourceFactory();
    }

    function getSharedURL(activityId){
      return _rest.getSharedURL({ id: activityId }).$promise;
    }

    function renovateSharedURL(activitySharingId){
      alert('rest sharing')
      return _rest.renovateSharedURL({ id: activitySharingId }).$promise;
    }

    function deleteSharedURL(activitySharingId){
      return _rest.deleteSharedURL({ id: activitySharingId }).$promise;
    }
  }

}());