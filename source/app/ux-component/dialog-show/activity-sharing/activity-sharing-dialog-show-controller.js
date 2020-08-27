(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('activititySharingDialogShowController', Controller);

  Controller.$inject = [
    'otusjs.activity.business.ActivitySharingService',
    'otusjs.otus.uxComponent.ActivitySharingDialogValues'
    // 'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(activitySharingService, ActivitySharingDialogValues) {
    const self = this;

    self.ActivitySharingDialogValues = ActivitySharingDialogValues;
    self.$onInit = onInit;
    self.getSharedURL = getSharedURL;
    self.deleteSharedURL = deleteSharedURL;
    self.activitySharing = {};

    function onInit() {
      getSharedURL();
      console.log(self.data)
    }

    function getSharedURL(activityId){
      activitySharingService.getSharedURL("5f3fde8dce3da4498f369d73")
        .then((activitySharing) => self.activitySharing = activitySharing)
        .then(console.info(self.activitySharing))
        .catch((e) => console.error(e))
      return;
    }

    function deleteSharedURL(activitySharingId){
      alert("delete button")
    }
  }
}());