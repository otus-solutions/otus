(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('activititySharingDialogShowController', Controller);

  Controller.$inject = [
    'otusjs.activity.business.ActivitySharingService',
    'otusjs.otus.uxComponent.ActivitySharingDialogValues',
    'otusjs.deploy.LoadingScreenService',
    // 'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(ActivitySharingService, ActivitySharingDialogValues, LoadingScreenService) {
    const self = this;

    self.ActivitySharingDialogValues = ActivitySharingDialogValues;
    self.$onInit = onInit;
    self.getSharedURL = getSharedURL;
    self.renovateSharedURL = renovateSharedURL;
    self.deleteSharedURL = deleteSharedURL;
    // self.activitySharing = null;

    function onInit() {
      LoadingScreenService.start();
      getSharedURL();
    }

    function getSharedURL(){
      ActivitySharingService.getSharedURL(self.data.activity.getID())
        .then(res => ActivitySharingService.parseActivitySharing(res.data.activitySharing))
        .then( activitySharing => self.activitySharing = activitySharing )
        .then(() =>  LoadingScreenService.finish())
        .then(() => console.log(self.activitySharing))
        .catch((e) => console.error(e));
    }

    function renovateSharedURL(){
      console.log(self.activitySharing.getExpirationDate())
      ActivitySharingService.renovateSharedURL(self.activitySharing.getId())
        .then(res => console.log(res))
        .catch(e => console.error(e))
    }

    function deleteSharedURL(activitySharingId){
      alert("delete button")
    }
  }
}());