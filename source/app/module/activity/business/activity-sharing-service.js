(function () {
  'use strict';

  angular.module('otusjs.activity.business')
    .service('otusjs.activity.business.ActivitySharingService', Service);

  Service.$inject = [
    'otusjs.activity.repository.ActivitySharingCollectionService',
    'otusjs.activity.business.model.ActivitySharingFactory'
  ];

  function Service(ActivitySharingCollectionService, ActivitySharingFactory) {
    const self = this;

    self.getSharedURL = getSharedURL;
    self.renovateSharedURL = renovateSharedURL;
    self.deleteSharedURL = deleteSharedURL;
    self.parseActivitySharing = parseActivitySharing;

    function getSharedURL(activityId) {
      return ActivitySharingCollectionService.getSharedURL(activityId);
    }


    function renovateSharedURL(sharedLinkId) {
      return "renovate sharedLink";
    }

    function deleteSharedURL(sharedLinkId) {
      return sharedLinkId;
    }

    function parseActivitySharing(activitySharingJson) {
      try {
        return ActivitySharingFactory.create(activitySharingJson);
      } catch (e) {
        throw new Error("Error Parse: an error occurred with shared link information")
      }
    }


  }

}());