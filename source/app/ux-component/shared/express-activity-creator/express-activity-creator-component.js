(function () {
  'use strict'

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusExpressActivityCreator', {
      controller: 'otusExpressActivityCreatorCtrl as $ctrl',
      templateUrl: 'app/ux-component/shared/express-activity-creator/express-activity-creator-template.html',
      bindings: {
        acronym: '<',
        participant: '<',
        ActivityCreatorResponseCallback: '<',
      }
    }).controller('otusExpressActivityCreatorCtrl', Controller);

  Controller.$inject = [
    'otusjs.application.dialog.DialogShowService'
  ];

  function Controller(DialogShowService) {
    const self = this;

    /* Public methods */
    self.$onInit = onInit;
    self.saveActivity = saveActivity;

    function onInit() {
      self.preActivityArtefacts = {};
    }


    function saveActivity() {
      self.preActivityArtefacts = {
        acronym: self.acronym,
        participant: self.participant,
        activityCreatorResponseCallback: self.activityCreatorResponseCallback
      }
      try{
        DialogShowService.showExpressActivityCreationDialog(self.preActivityArtefacts, true);
      }
      catch(e){
        alert("cancelou a criação");
      }
    }
  }

}())