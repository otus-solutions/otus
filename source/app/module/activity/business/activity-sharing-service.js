(function () {
  'use strict';

  angular.module('otusjs.activity.business')
    .service('otusjs.activity.business.ActivitySharingService', Service);

  Service.$inject = [

  ];

  function Service() {
    const self = this;

    self.getSharedLink = getSharedLink;
    self.renovateSharedLink = renovateSharedLink;
    self.deleteSharedLink = deleteSharedLink;

    function getSharedLink(activityId) {
      return "get sharedLink";
    }

    function renovateSharedLink(sharedLinkId) {
      return "renovate sharedLink";
    }

    function deleteSharedLink(sharedLinkId) {
      return sharedLinkId;
    }

  }

}());