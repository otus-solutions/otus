(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationLotManagerList', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/manager-list/lot-manager-list/sample-transportation-lot-manager-list-template.html',
      bindings: {
        selectedLots: '<'
      },
      require: {
        otusSampleTransportationManagerList: '^otusSampleTransportationManagerList'
      }
    });

  Controller.$inject = [
    'otusjs.laboratory.business.project.transportation.AliquotTransportationService',
    '$scope'
  ];

  function Controller(AliquotTransportationService,$scope) {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    self.view = 'Cards';
    self.limit = 3;
    self.show = self.limit;
    self.page = 2;
    self.showMore = showMore;

    function showMore(){
      self.show+= self.limit;
    }

    /* Public methods */
    self.selectLot = selectLot;
    self.updateOnDelete = updateOnDelete;
    self.lotsList = [];

    function onInit() {
      _LoadLotsList();
      self.otusSampleTransportationManagerList.listComponent = self;
    }

    function selectLot(lot) {
      var activityIndex = self.selectedLots.indexOf(lot);
      if (activityIndex > -1) {
        self.selectedLots.splice(activityIndex, 1);
        lot.isSelected = false;
      } else {
        self.selectedLots.push(lot);
        lot.isSelected = true;
      }
    }

    function updateOnDelete() {
      _LoadLotsList();
    }

    function _LoadLotsList() {
      AliquotTransportationService.getLots().then(function(response) {
        self.lotsList = response;
        _setChartData();
      });
    }

    function _setChartData() {
      self.lotDataSet = [];
      self.lotsList.forEach(function (lot) {
        var labelsCount = {};
        var color = ["#8e5ea2","#3cba9f","#e8c3b9","#c45850"];

        var dataSet = [];
        dataSet["backgroundColor"] = [];
        dataSet["data"] = [];
        dataSet["chartId"] = lot.code;

        lot.aliquotList.forEach(function (aliquot) {
          if(labelsCount[aliquot.label]){

            labelsCount[aliquot.label] = labelsCount[aliquot.label]  + 1;
          } else {
            labelsCount[aliquot.label] = 1;
            dataSet["backgroundColor"].push(color[Object.keys(labelsCount).length-1]);
          }
        });

        for(var key in labelsCount) {
          dataSet["data"].push(labelsCount[key]);
        }
        self.lotDataSet.push(dataSet);
      });

    }

  }
}());
