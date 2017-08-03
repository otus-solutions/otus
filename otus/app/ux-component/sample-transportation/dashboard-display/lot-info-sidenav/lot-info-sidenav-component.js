(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationLotInfoSidenav', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/dashboard-display/lot-info-sidenav/lot-info-sidenav-template.html',
      bindings: {
        selectedLot: '<'
      },
      require: {
        otusSampleTransportationDashboardDisplay: '^otusSampleTransportationDashboardDisplay'
      }
    });

  Controller.$inject = [
    '$mdSidenav'
  ];

  function Controller($mdSidenav) {
    var self = this;

    /* Public methods */
    self.show = show;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {
      self.otusSampleTransportationDashboardDisplay.lotInfoComponent = self;
    }

    function show() {
      $mdSidenav('right').toggle();
    }
  }
}());
