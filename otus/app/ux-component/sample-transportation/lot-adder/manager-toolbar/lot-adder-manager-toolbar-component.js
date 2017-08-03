(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusLotAdderManagerToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/lot-adder/manager-toolbar/lot-adder-manager-toolbar-template.html',
    });

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(ApplicationStateService) {
    var self = this;

    self.returnToSampleTransportationDashboard = returnToSampleTransportationDashboard;

    function returnToSampleTransportationDashboard() {
      ApplicationStateService.activateSampleTransportationManagerList();
    }
  }
}());
