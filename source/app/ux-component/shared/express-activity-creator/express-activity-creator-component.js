(function () {
  'use strict'

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusExpressActivityCreator', {
      controller: 'otusExpressActivityCreatorCtrl as $ctrl',
      templateUrl: 'app/ux-component/shared/express-activity-creator/express-activity-creator-template.html',
      bindings: {
        acronym: '<',
        categories: '<',
        types: '<',
        participant: '<',
        checkers: '<'
      }
    }).controller('otusExpressActivityCreatorCtrl', Controller);

  Controller.$inject = [
    'otusjs.application.dialog.DialogShowService'
  ];

  function Controller(DialogShowService) {
    const self = this;

    /* Public methods */
    self.saveActivity = saveActivity;


    function saveActivity(data, isExternalID) {
      DialogShowService.showExpressActivityCreationDialog({}, true, );
    }
  }

}())