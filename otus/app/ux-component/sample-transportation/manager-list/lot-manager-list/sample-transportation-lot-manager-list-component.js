(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationLotManagerList', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/manager-list/lot-manager-list/sample-transportation-lot-manager-list-template.html',
      bindings: {
        selectedLots: '='
      },
      require: {
        otusSampleTransportationManagerList: '^otusSampleTransportationManagerList'
      }
    });

  Controller.$inject = [
    'otusjs.laboratory.business.project.transportation.AliquotTransportationService',
    '$filter'
  ];

  function Controller(AliquotTransportationService,$filter) {
    var self = this;
    //TODO: Colors for the aliquots types in the chats, the colors will be dynamic in the future
    var color = ["#F44336","#E91E63","#9C27B0","#673AB7","#3F51B5","#2196F3",
                "#03A9F4","#00BCD4","#009688","#4CAF50","#8BC34A","#CDDC39",
                "#FFEB3B","#FFC107","#FF9800","#FF5722","#795548","#9E9E9E",
                "#9E9E9E","#000000","#B71C1C","#880E4F","#4A148C","#311B92",
                "#1A237E","#0D47A1","#01579B","#006064","#004D40","#1B5E20"];

    /* Lifecycle hooks */
    self.$onInit = onInit;

    self.view = 'Cards';
    self.limit = 3;
    self.show = self.limit;
    self.page = 2;
    self.centerFilter = "";
    self.shipmentBeginFilter = "";
    self.shipmentEndFilter = "";

    self.showMore = showMore;

    function showMore(){
      self.show+= self.limit;
    }

    /* Public methods */
    self.selectLot = selectLot;
    self.updateOnDelete = updateOnDelete;
    self.onFilter = onFilter;
    self.lotsList = [];

    function onInit() {
      self.lotDataSet = [];
      self.colorSet = [];
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
        self.lotsListImutable = response;
        _setChartData();
      });
    }

    function onFilter(){
      self.selectedLots = [];
      self.lotsList = self.lotsListImutable.filter(function (lot) {
        if(self.centerFilter.length) {
          return lot.fieldCenter.acronym == self.centerFilter;
        } else {
          return lot;
        }
      }).filter(function (lot2) {
        if(self.shipmentBeginFilter.toString().length && self.shipmentEndFilter.toString().length) {
          var lotFormatedData = $filter('date')(lot2.shipmentDate,'yyyyMMdd');
          var initialDateFormated = $filter('date')(self.shipmentBeginFilter,'yyyyMMdd');
          var finalDateFormated = $filter('date')(self.shipmentEndFilter,'yyyyMMdd');
          return (lotFormatedData >= initialDateFormated && lotFormatedData <= finalDateFormated);
        } else {
          return lot2;
        }
      });
      _setChartData();
    }

    function _setChartData() {
      self.lotDataSet = [];
      self.lotsList.forEach(function (lot) {
        lot.isSelected = false;
        var labelsCount = {};

        var dataSet = [];
        dataSet.backgroundColor = [];
        dataSet.data = [];
        dataSet.labels = [];
        dataSet.fieldCenter = lot.fieldCenter;
        dataSet.chartId = lot.code;

        lot.aliquotList.forEach(function (aliquot) {
          if(labelsCount[aliquot.label]){
            labelsCount[aliquot.label] = labelsCount[aliquot.label]  + 1;
          } else {
            labelsCount[aliquot.label] = 1;
            dataSet.labels.push(aliquot.label)
          }
          if(!self.colorSet[aliquot.label]){
            self.colorSet[aliquot.label] = color[Object.keys(self.colorSet).length]
          }
        });

        for(var key in labelsCount) {
          dataSet.data.push(labelsCount[key]);
          dataSet.backgroundColor.push(self.colorSet[key]);
        }

        self.lotDataSet.push(dataSet);
      });

    }

  }
}());
