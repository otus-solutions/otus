(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusExamLotInfoSidenav', {
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
    '$mdSidenav',
    'otusjs.laboratory.business.project.transportation.AliquotTransportationService'
  ];

  function Controller($mdSidenav, AliquotTransportationService) {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public methods */
    self.show = show;

    function onInit() {
      self.otusSampleTransportationManagerList.lotInfoComponent = self;
      self.selectedLot.aliquotList.forEach(function(aliquot) {
        aliquot.containerLabel = AliquotTransportationService.getContainerLabelToAliquot(aliquot);
      }, this);
    }

    function show() {
      $mdSidenav('right').toggle();
    }
  }
}());