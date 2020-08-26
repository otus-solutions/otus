(function () {
  'use strict';

  angular.module('otusjs.activity.business')
    .service('otusjs.activity.business.ActivitySharingService', Service);

  Service.$inject = [
    'otusjs.activity.repository.ActivitySharingCollectionService'
  ];

  function Service(ActivitySharingCollectionService) {
    const self = this;

    self.getSharedLink = getSharedLink;
    self.renovateSharedLink = renovateSharedLink;
    self.deleteSharedLink = deleteSharedLink;

    function getSharedLink(activityID) {
      return ActivitySharingCollectionService.getSharedLink(activityID);
    }

    function renovateSharedLink(sharedLinkId) {
      return "renovate sharedLink";
    }

    function deleteSharedLink(sharedLinkId) {
      return sharedLinkId;
    }

  }

}());