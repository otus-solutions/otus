(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityAdderToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-adder-toolbar/activity-adder-toolbar-template.html',
      bindings: {
        onAddActivities: '&',
        title: '@'
      }
    });

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(ApplicationStateService) {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;
    /* Public methods */
    self.addActivities = addActivities;
    self.returnToParticipantActivities = returnToParticipantActivities;

    function onInit() {
      self.activityType = window.sessionStorage.getItem('activityType');
    }

    function addActivities() {
      self.onAddActivities();
    }

    function returnToParticipantActivities() {
      ApplicationStateService.activateParticipantActivities();
    }
  }
}());
