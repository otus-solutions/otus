(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationLotManagerList', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/lot-manager-list/sample-transportation-lot-manager-list-template.html',
    });

  Controller.$inject = [
    'otusjs.laboratory.business.transportation.AliquotTransportationService'
  ];

  function Controller(AliquotTransportationService) {
    var self = this;

    self.$onInit = onInit;

    function onInit() {
      _LoadLotsList();
    }

    function _LoadLotsList() {
      self.lotsList = AliquotTransportationService.loadLots().then(function(response) {
         self.lotsList = response;
      });
    }
  }
}());
