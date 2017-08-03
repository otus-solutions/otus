(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationLotAddButton', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/manager-list/lot-add-button/lot-add-button-template.html'
    });

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(ApplicationStateService) {
    var self = this;

    self.lotAdder = lotAdder;

    function lotAdder() {
      ApplicationStateService.activateSampleTransportationLotAdder();
    }
  }
}());
