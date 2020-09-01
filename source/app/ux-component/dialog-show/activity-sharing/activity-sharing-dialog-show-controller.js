(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('activititySharingDialogShowController', Controller);

  Controller.$inject = [
    'otusjs.activity.business.ActivitySharingService',
    'otusjs.otus.uxComponent.ActivitySharingDialogValues',
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller(ActivitySharingService, ActivitySharingDialogValues, LoadingScreenService) {
    const self = this;
    self.ActivitySharingDialogValues = ActivitySharingDialogValues;
    self.liveLink = false;

    self.$onInit = onInit;
    self.getSharedURL = getSharedURL;
    self.renovateSharedURL = renovateSharedURL;
    self.deleteSharedURL = deleteSharedURL;
    self.copyLinkToClipboard = copyLinkToClipboard;

    function onInit() {
      LoadingScreenService.start();
      getSharedURL();
    }

    function getSharedURL() {
      ActivitySharingService.getSharedURL(self.data.activity.getID())
        .then(res => ActivitySharingService.parseActivitySharing(res.data))
        .then(activitySharing => self.activitySharing = activitySharing)
        .then(() => self.liveLink = self.activitySharing.isValid())
        .then(() => LoadingScreenService.finish())
        .catch((e) => {
          LoadingScreenService.finish();
          self.data.cancel();
          ActivitySharingService.callToast(`${ActivitySharingDialogValues.toaster.failMsgGetLink} ${e}`, 3000, "error-toast");
        });
    }

    function renovateSharedURL() {
      LoadingScreenService.start();
      ActivitySharingService.renovateSharedURL(self.activitySharing.getId())
        .then(res => ActivitySharingService.parseActivitySharing(res.data))
        .then(activitySharing => self.activitySharing = activitySharing)
        .then(() => self.liveLink = self.activitySharing.isValid())
        .then(() => LoadingScreenService.finish())
        .catch((e) => {
          LoadingScreenService.finish()
          self.data.cancel();
          ActivitySharingService.callToast(`${ActivitySharingDialogValues.toaster.failMsgRenovate}`, 3000, "error-toast");
        });
    }

    function deleteSharedURL() {
      LoadingScreenService.start();
      ActivitySharingService.deleteSharedURL(self.activitySharing.getId())
        .then(() => self.activitySharing = null)
        .then(() => self.data.cancel())
        .then(() => LoadingScreenService.finish())
        .then(() => ActivitySharingService.callToast(ActivitySharingDialogValues.toaster.successDelete, 3000))
        .catch((e) => {
          LoadingScreenService.finish()
          self.data.cancel();
          ActivitySharingService.callToast(`${ActivitySharingDialogValues.toaster.failMsgDelete}`, 3000, "error-toast");
        });
    }

    function copyLinkToClipboard(link, mode) {
      switch (mode) {
        case 'link':
          ActivitySharingService.copyLinkToClipboard(link)
          ActivitySharingService.callToast(`${ActivitySharingDialogValues.toaster.copyLink}`, 3000)
          break;
        case 'msg':
          ActivitySharingService.copyLinkToClipboard(_getMsgLinkFormated(link));
          ActivitySharingService.callToast(`${ActivitySharingDialogValues.toaster.copyMsg}`, 3000);
          break;
      }
    }

    /*Do not format the message text below, otherwise you will lose the Clipboard Tab*/
    function _getMsgLinkFormated(link) {
      return `${ActivitySharingDialogValues.titles.ativitity}: ${self.data.activity.surveyForm.acronym} - ${self.data.activity.surveyForm.name}
${ActivitySharingDialogValues.titles.participant}: ${self.data.activity.participantData.name}

${link}`;
    }

  }
}());