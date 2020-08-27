(function () {
  'use strict';

  angular
    .module('otusjs.activity.business')
    .factory('otusjs.activity.business.model.ActivitySharingFactory', Factory);

  function Factory() {
    const self = this;
    self.create = create;

    function create(activitySharingJson) {
      return new ActivitySharing(activitySharingJson);
    }

    return self;
  }

  function ActivitySharing(activitySharingJson) {
    const self = this;

    self._id = activitySharingJson._id;
    self.objectType = activitySharingJson.objectType;
    self.activityId = activitySharingJson.activityId;
    self.creationDate = activitySharingJson.creationDate;
    self.expirationDate = activitySharingJson.expirationDate;
    self.participantToken = activitySharingJson.participantToken;
    self.userId = activitySharingJson.userId;

    self.getId = getId;
    self.checkDateExpiration = checkDateExpiration;
    self.getExpirationDate = getExpirationDate;

    function getId() {
      return self._id;
    }

    function checkDateExpiration() {
      console.log(new Date(self.expirationDate));
      return false;
    }

    function getExpirationDate() {
      return new Date(self.expirationDate)
    }
  }

}());