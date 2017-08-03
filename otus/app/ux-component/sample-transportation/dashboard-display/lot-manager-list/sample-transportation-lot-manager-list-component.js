(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationLotManagerList', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/dashboard-display/lot-manager-list/sample-transportation-lot-manager-list-template.html',
      bindings: {
        onUpdateSelectedLots: '&'
      },
      require: {
        otusSampleTransportationDashboardDisplay: '^otusSampleTransportationDashboardDisplay'
      }
    });

  Controller.$inject = [
    'otusjs.laboratory.business.project.transportation.AliquotTransportationService'
  ];

  function Controller(AliquotTransportationService) {
    var self = this;
    var _selectedLots = [];

    self.$onInit = onInit;
    self.selectLot = selectLot;
    self.updateOnDelete = updateOnDelete;

    function onInit() {
      _LoadLotsList();
      self.otusSampleTransportationDashboardDisplay.listComponent = self;
    }

    function updateOnDelete() {
      _selectedLots = [];
      _updateSelected();
      _LoadLotsList();
    }

    function _LoadLotsList() {
      self.lotsList = AliquotTransportationService.loadLots().then(function(response) {
         self.lotsList = response;
      });
    }

    function selectLot(lot) {
      var activityIndex = _selectedLots.indexOf(lot);
      if (activityIndex > -1) {
        _selectedLots.splice(activityIndex, 1);
        lot.isSelected = false;
      } else {
        _selectedLots.push(lot);
        lot.isSelected = true;
      }
      _updateSelected(_selectedLots);
    }

    function _updateSelected(selectedlots) {
      self.onUpdateSelectedLots({
        lots: selectedlots
      });
    }
  }
}());
