(function () {
  'use strict'

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusExpressActivityCreator', {
      controller: 'otusExpressActivityCreatorCtrl as $ctrl',
      templateUrl: 'app/ux-component/shared/express-activity-creator/express-activity-creator-template.html',
      bindings: {
        acronym: '@',
        stageId: '@',
        actionRefreshCallback: '&',
      }
    }).controller('otusExpressActivityCreatorCtrl', Controller);

  Controller.$inject = [
    'otusjs.application.dialog.DialogShowService'
  ];

  function Controller(DialogShowService) {
    const self = this;
    self.preActivityArtefacts = {};

    /* Public methods */
    self.$onInit = onInit;
    self.saveActivity = saveActivity;

    function onInit() {
      self.preActivityArtefacts = {
        acronym: self.acronym,
        stageId: self.stageId,
        actionRefreshCallback: self.actionRefreshCallback
      }
    }

    function saveActivity() {
      DialogShowService.showExpressActivityCreationDialog(self.preActivityArtefacts);
    }
  }

}())