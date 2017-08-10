(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('sampleTransportationDashboard', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/dashboard/sample-transportation-dashboard-template.html',
    });

  Controller.$inject = [
    'STATE',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(STATE, ApplicationStateService) {
    var self = this;

    // lifecycle hooks
    self.$onInit = onInit;

    /* Public methods */
    function onInit() {
      ApplicationStateService.activateSampleTransportationManagerList();
    }
  }
}());
