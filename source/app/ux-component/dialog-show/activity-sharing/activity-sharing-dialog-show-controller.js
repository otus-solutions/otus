(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('activititySharingDialogShowController', Controller);

  Controller.$inject = [
    'otusjs.activity.business.ActivitySharingService'
    // 'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(activitySharingService) {
    let self = this;
    var DEFAULT_DIMENSIONS = {'min-height':'200px', 'min-width':'300px'};

    self.$onInit = onInit;
    self.getSharedLink = getSharedLink;

    function onInit() {
      getSharedLink();
    }

    function getSharedLink(activityId){
      activitySharingService.getSharedLink("5f3fde8dce3da4498f369d73")
        .then((link) => console.info(link))
        .catch((e) => console.error(e))
      return;
    }
  }
}());