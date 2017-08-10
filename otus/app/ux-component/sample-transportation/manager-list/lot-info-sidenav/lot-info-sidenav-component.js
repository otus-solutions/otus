(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationLotInfoSidenav', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/manager-list/lot-info-sidenav/lot-info-sidenav-template.html',
      bindings: {
        selectedLot: '<'
      },
      require: {
        otusSampleTransportationManagerList: '^otusSampleTransportationManagerList'
      }
    });

  Controller.$inject = [
    '$mdSidenav'
  ];

  function Controller($mdSidenav) {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public methods */
    self.show = show;

    function onInit() {
      self.otusSampleTransportationManagerList.lotInfoComponent = self;
    }

    function show() {
      $mdSidenav('right').toggle();
    }
  }
}());
