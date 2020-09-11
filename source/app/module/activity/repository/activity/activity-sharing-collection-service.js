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
    self.renovateSharedURL = renovateSharedURL;
    self.deleteSharedURL = deleteSharedURL;

    function getSharedURL(activityId){
      return ActivityRemoteStorageService.getSharedURL(activityId);
    }

    function renovateSharedURL(activitySharingId){
      return ActivityRemoteStorageService.renovateSharedURL(activitySharingId);
    }

    function deleteSharedURL(activitySharingId){
      return ActivityRemoteStorageService.deleteSharedURL(activitySharingId);
    }
  }

}())