(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityManagerCommander', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-manager-commander/activity-manager-commander-template.html'
    });

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(ApplicationStateService) {
    var self = this;

    /* Public methods */
    self.goToActivityAdder = goToActivityAdder;
    self.goToPaperActivityInitializer = goToPaperActivityInitializer;

    function goToActivityAdder() {
      ApplicationStateService.activateActivityAdder();
    }

    function goToPaperActivityInitializer() {
      ApplicationStateService.activatePaperActivityInitializer();
    }
  }
}());
