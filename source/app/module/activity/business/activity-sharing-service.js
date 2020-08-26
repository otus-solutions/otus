(function () {
  'use strict';

  angular.module('otusjs.activity.business')
    .service('otusjs.activity.business.ActivitySharingService', Service);

  Service.$inject = [
    'otusjs.activity.repository.ActivitySharingCollectionService'
  ];

  function Service(ActivitySharingCollectionService) {
    const self = this;

    self.getSharedURL = getSharedURL;
    self.renovateSharedURL = renovateSharedURL;
    self.deleteSharedURL = deleteSharedURL;

    function getSharedURL(activityId) {
      return ActivitySharingCollectionService.getSharedURL(activityId);
    }

    function renovateSharedURL(sharedLinkId) {
      return "renovate sharedLink";
    }

    function deleteSharedURL(sharedLinkId) {
      return sharedLinkId;
    }

  }

}());