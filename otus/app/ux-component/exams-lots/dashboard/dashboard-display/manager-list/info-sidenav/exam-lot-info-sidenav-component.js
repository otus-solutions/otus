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
        otusExamsLotsManager: '^otusExamsLotsManager'
      }
    });

  Controller.$inject = [
    '$mdSidenav',
    'otusjs.laboratory.business.project.exams.ExamLotService'
  ];

  function Controller($mdSidenav, ExamLotService) {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public methods */
    self.show = show;

    function onInit() {
      self.otusExamsLotsManager.lotInfoComponent = self;
      self.selectedLot.aliquotList.forEach(function(aliquot) {
        aliquot.containerLabel = ExamLotService.getContainerLabelToAliquot(aliquot);
      }, this);
    }

    function show() {
      $mdSidenav('right').toggle();
    }
  }
}());