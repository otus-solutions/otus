(function () {
  'use strict';

  angular
    .module('otusjs.activity.repository')
    .service('otusjs.activity.repository.ActivitySharingCollectionService', Service);

  Service.$inject = [
    'otusjs.deploy.ActivityRemoteStorageService'
  ]

  function Service(ActivityRemoteStorageService){
    const self = this;

    self.getSharedURL = getSharedURL;

    function getSharedURL(activityId){
      return ActivityRemoteStorageService.getSharedURL(activityId);
    }
  }

}())