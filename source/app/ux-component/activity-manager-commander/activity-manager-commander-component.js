(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityManagerCommander', {
      controller: 'otusActivityManagerCommanderCtrl as $ctrl',
      templateUrl: 'app/ux-component/activity-manager-commander/activity-manager-commander-template.html'
    }).controller('otusActivityManagerCommanderCtrl', Controller);

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(ApplicationStateService) {
    var self = this;

    /* Public methods */
    self.goToActivityAdder = goToActivityAdder;

    function goToActivityAdder() {
      ApplicationStateService.setCurrentStateStorage();
      ApplicationStateService.activateActivityAdder();
    }
   }
}());
