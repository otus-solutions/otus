(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('activititySharingDialogShowController', Controller);

  Controller.$inject = [
    'otusjs.activity.business.ActivitySharingService',
    'otusjs.otus.uxComponent.ActivitySharingDialogValues',
    'otusjs.deploy.LoadingScreenService',
    '$mdToast'
  ];

  function Controller(ActivitySharingService, ActivitySharingDialogValues,
                      LoadingScreenService, $mdToast) {
    const self = this;

    self.ActivitySharingDialogValues = ActivitySharingDialogValues;
    self.$onInit = onInit;
    self.getSharedURL = getSharedURL;
    self.renovateSharedURL = renovateSharedURL;
    self.deleteSharedURL = deleteSharedURL;
    self.liveLink = false;

    function onInit() {
      LoadingScreenService.start();
      getSharedURL();
    }

    function getSharedURL(){
      ActivitySharingService.getSharedURL(self.data.activity.getID())
        .then(res => ActivitySharingService.parseActivitySharing(res.data))
        .then(activitySharing => self.activitySharing = activitySharing)
        .then(() => self.liveLink = self.activitySharing.isValid())
        .then(() =>  LoadingScreenService.finish())
        .then(() => console.log(self.activitySharing))
        .catch((e) => console.error(e));
    }

    function renovateSharedURL(){
      LoadingScreenService.start();
      ActivitySharingService.renovateSharedURL(self.activitySharing.getId())
        .then(res => ActivitySharingService.parseActivitySharing(res.data))
        .then(activitySharing => self.activitySharing = activitySharing)
        .then(() => self.liveLink = self.activitySharing.isValid())
        .then(() =>  LoadingScreenService.finish())
        .catch(e => console.error(e));
    }

    function deleteSharedURL(){
      LoadingScreenService.start();
      ActivitySharingService.deleteSharedURL(self.activitySharing.getId())
        .then(() => self.activitySharing = null)
        .then(() => self.data.cancel())
        .then(() =>  LoadingScreenService.finish())
        .then(() => _callToast(ActivitySharingDialogValues.toaster.delete))
        .catch((e) => _callToast(`${ActivitySharingDialogValues.toaster.fail} ${e}`, "error-toast"));
    }

    function _callToast(msg, theme="default"){
        $mdToast.show(
          $mdToast.simple()
            .textContent(msg)
            .position('bottom right')
            .theme(theme)
            .hideDelay(5000)
        );
      }

  }
}());