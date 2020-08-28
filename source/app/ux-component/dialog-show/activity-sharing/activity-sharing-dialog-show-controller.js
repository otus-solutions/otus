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

  function Controller(ActivitySharingService, ActivitySharingDialogValues,
                      LoadingScreenService) {
    const self = this;

    self.ActivitySharingDialogValues = ActivitySharingDialogValues;
    self.$onInit = onInit;
    self.getSharedURL = getSharedURL;
    self.renovateSharedURL = renovateSharedURL;
    self.deleteSharedURL = deleteSharedURL;
    self.copyLinkToClipboard = copyLinkToClipboard;
    self.liveLink = false;

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
        .then(() => console.log(self.activitySharing))
        .catch((e) => console.error(e));
    }

    function renovateSharedURL() {
      LoadingScreenService.start();
      ActivitySharingService.renovateSharedURL(self.activitySharing.getId())
        .then(res => ActivitySharingService.parseActivitySharing(res.data))
        .then(activitySharing => self.activitySharing = activitySharing)
        .then(() => self.liveLink = self.activitySharing.isValid())
        .then(() => LoadingScreenService.finish())
        .catch(e => console.error(e));
    }

    function deleteSharedURL() {
      LoadingScreenService.start();
      ActivitySharingService.deleteSharedURL(self.activitySharing.getId())
        .then(() => self.activitySharing = null)
        .then(() => self.data.cancel())
        .then(() => LoadingScreenService.finish())
        .then(() => ActivitySharingService.callToast(ActivitySharingDialogValues.toaster.delete, 5000))
        .catch((e) =>
          ActivitySharingService.callToast(`${ActivitySharingDialogValues.toaster.fail} ${e}`, 5000, "error-toast"));
    }

    function copyLinkToClipboard(link, mode) {
      switch (mode) {
        case 'link':
          ActivitySharingService.copyLinkToClipboard(link)
          ActivitySharingService.callToast("Link copiado!", 4000)
          break;
        case 'msg':
          let msgLink =
            `Atividade: ${self.data.activity.surveyForm.acronym} - ${self.data.activity.surveyForm.name}
Participante: ${self.data.activity.participantData.name}
URL: ${link}`;
          ActivitySharingService.copyLinkToClipboard(msgLink);
          ActivitySharingService.callToast("Link copiado!", 4000);
          break;
      }
    }
  }
}());