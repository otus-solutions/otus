(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityManagerCommander', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-aliquot-manager-commander/activity-aliquot-manager-commander-template.html'
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
      window.sessionStorage.setItem('activityType', "Online");
      ApplicationStateService.activateActivityAdder();
    }

    function goToPaperActivityInitializer() {
      window.sessionStorage.setItem('activityType', "em Papel");
      ApplicationStateService.activatePaperActivityInitializer();
    }
  }
}());
