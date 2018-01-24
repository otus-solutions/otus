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
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.laboratory.business.project.transportation.AliquotTransportationService',
    '$mdToast',
    'otusjs.laboratory.core.ContextService',
    'otusjs.otus.dashboard.core.ContextService',
    '$filter',
    'otusjs.deploy.model.AliquotFacadeService'
  ];

  function Controller(ProjectFieldCenterService, AliquotTransportationService, $mdToast, laboratoryContextService, dashboardContextService, $filter, AliquotFacadeService) {
    var self = this;

    //TODO: Colors for the aliquots types in the charts, the colors will be dynamic in the future
    var color = ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3",
      "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39",
      "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E",
      "#9E9E9E", "#000000", "#B71C1C", "#880E4F", "#4A148C", "#311B92",
      "#1A237E", "#0D47A1", "#01579B", "#006064", "#004D40", "#1B5E20"
    ];

    /* Lifecycle hooks */
    self.$onInit = onInit;

    self.view = 'Cards';
    self.limit = 3;
    self.show = self.limit;
    self.page = 2;
    self.centerFilter = "";
    self.shipmentBeginFilter = "";
    self.shipmentEndFilter = "";
    self.centers = [];
    self.lotsList = [];
    self.lotsListImutable = [];

    self.showMore = showMore;

    function showMore() {
      self.show += self.limit;

    }
    /* Public methods */
    self.selectLot = selectLot;
    self.updateOnDelete = updateOnDelete;
    self.onFilter = onFilter;

    function onInit() {
      ProjectFieldCenterService.loadCenters().then(function(result) {
        self.lotDataSet = [];
        self.colorSet = [];
        self.centers = $filter('orderBy')(self.centers);
        result.forEach(function(fieldCenter) {
          self.centers.push(fieldCenter.acronym)
        });
        _LoadLotsList();
        setUserFieldCenter();
      });
      self.otusSampleTransportationManagerList.listComponent = self;
    }

    function setUserFieldCenter() {
      dashboardContextService
        .getLoggedUser()
        .then(function(userData) {
          self.centerFilter = userData.fieldCenter.acronym ? userData.fieldCenter.acronym : laboratoryContextService.getSelectedFieldCenter() ? laboratoryContextService.getSelectedFieldCenter() : "";
          laboratoryContextService.setSelectedFieldCenter(self.centerFilter);
          self.centerFilterselectedIndex = self.centers.indexOf(self.centerFilter) >= 0 ? self.centers.indexOf(self.centerFilter) : 0;
          self.centerFilterDisabled = userData.fieldCenter.acronym ? "disabled" : "";
        });
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
        self.onFilter();
        _setChartData();
      });
    }

    function onFilter() {
      self.selectedLots = [];
      self.show = self.limit;
      laboratoryContextService.setSelectedFieldCenter(self.centerFilter);
      if (self.lotsListImutable.length) {
        self.lotsList = self.lotsListImutable.filter(function(lot) {
          if (self.centerFilter.length) {
            return lot.fieldCenter.acronym == self.centerFilter;
          } else {
            return lot;
          }
        }).filter(function(FilteredByCenter) {
          var lotFormatedData = $filter('date')(FilteredByCenter.shipmentDate, 'yyyyMMdd');
          if (self.shipmentBeginFilter && self.shipmentEndFilter) {
            var initialDateFormated = $filter('date')(self.shipmentBeginFilter, 'yyyyMMdd');
            var finalDateFormated = $filter('date')(self.shipmentEndFilter, 'yyyyMMdd');
            if (initialDateFormated <= finalDateFormated) {
              return (lotFormatedData >= initialDateFormated && lotFormatedData <= finalDateFormated);
            } else {
              var msgDataInvalida = "Datas invalidas";

              $mdToast.show(
                $mdToast.simple()
                .textContent(msgDataInvalida)
                .hideDelay(4000)
              );
              return FilteredByCenter;
            }
          } else {
            return FilteredByCenter;
          }
        });
        _setChartData();
      }
    }
    // TODO: Realizar calculo do model
    function _setChartData() {
      self.lotDataSet = [];
      AliquotFacadeService.setLotsList(self.lotsList);
      var _lots = AliquotFacadeService.getChartData();
      _lots.then(function(dataSet) {
        self.lotDataSet.push(dataSet);
      });

    }

    //TODO: remover
    // function _setChartData() {
    //   self.lotDataSet = [];
    //   self.lotsList.forEach(function (lot) {
    //     lot.isSelected = false;
    //     var labelsCount = {};
    //
    //     var dataSet = [];
    //     dataSet.backgroundColor = [];
    //     dataSet.data = [];
    //     dataSet.labels = [];
    //     dataSet.fieldCenter = lot.fieldCenter;
    //     dataSet.chartId = lot.code;
    //
    //     lot.aliquotList.forEach(function (aliquot) {
    //       if(labelsCount[aliquot.label]){
    //         labelsCount[aliquot.label] = labelsCount[aliquot.label]  + 1;
    //       } else {
    //         labelsCount[aliquot.label] = 1;
    //         dataSet.labels.push(aliquot.label);
    //       }
    //       if(!self.colorSet[aliquot.label]){
    //         self.colorSet[aliquot.label] = color[Object.keys(self.colorSet).length];
    //       }
    //     });
    //
    //     for(var key in labelsCount) {
    //       dataSet.data.push(labelsCount[key]);
    //       dataSet.backgroundColor.push(self.colorSet[key]);
    //     }
    //
    //     self.lotDataSet.push(dataSet);
    //   });
    //
    // }
  }
}());
