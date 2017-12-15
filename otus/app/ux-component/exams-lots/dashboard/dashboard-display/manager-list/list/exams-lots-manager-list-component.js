(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusExamsLotsManagerList', {
      controller: Controller,
      templateUrl: 'app/ux-component/exams-lots/dashboard/dashboard-display/manager-list/list/exams-lots-manager-list-template.html',
      bindings: {
        selectedLots: '=',
        csvData: '='
      },
      require: {
        otusExamsLotsManager: '^otusExamsLotsManager'
      }
    });

  Controller.$inject = [
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.laboratory.business.project.exams.ExamLotService',
    '$mdToast',
    'otusjs.laboratory.core.ContextService',
    'otusjs.otus.dashboard.core.ContextService',
    '$filter'
  ];

  function Controller(ProjectFieldCenterService,ExamLotService,$mdToast,laboratoryContextService,dashboardContextService,$filter) {
    var self = this;


    /* Lifecycle hooks */
    self.$onInit = onInit;

    self.centerFilter = "";
    self.examFilter = "";
    self.creationBeginFilter = "";
    self.creationEndFilter = "";
    self.centers = [];
    self.exams = [];
    self.lotsList = [];
    self.lotsListImutable = [];

    self.showMore = showMore;
    function showMore(){
      self.show+= self.limit;
    }

    /* Public methods */
    self.selectLot = selectLot;
    self.updateOnDelete = updateOnDelete;
    self.onFilter = onFilter;

    function onInit() {
      console.log(self.csvData);
      ExamLotService.getDescriptors().then(function (result) {
        result.forEach(function (aliquotTypes) {
          console.log(ExamLotService.getDescriptors());
          self.exams.push(aliquotTypes)
        });
      });

      ProjectFieldCenterService.loadCenters().then(function (result) {
        self.lotDataSet = [];
        self.colorSet = [];
        self.centers = $filter('orderBy')(self.centers);
        result.forEach(function (fieldCenter) {
          self.centers.push(fieldCenter.acronym)
        });
        _LoadLotsList();
        setUserFieldCenter();
      });
      self.otusExamsLotsManager.listComponent = self;
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
      if(self.selectedLots.length == 1){
        self.csvData = self.selectedLots[0].getAliquotsToCsv();
      }
    }

    function updateOnDelete() {
      _LoadLotsList();
    }

    function _LoadLotsList() {
      ExamLotService.getLots().then(function(response) {
        self.lotsList = response;
        self.lotsListImutable = response;
        self.onFilter();
      });
    }

    function onFilter(){
      self.selectedLots = [];
      self.show = self.limit;
      laboratoryContextService.setSelectedFieldCenter(self.centerFilter);
      laboratoryContextService.setSelectedExamType(self.examFilter);
      if(self.lotsListImutable.length) {
        self.lotsList = self.lotsListImutable
          .filter(function (lot) {
            if (self.centerFilter.length) {
              return lot.fieldCenter.acronym == self.centerFilter;
            } else {
              return lot;
            }
          })
          .filter(function (FilteredByCenter) {
            var lotFormattedData = $filter('date')(FilteredByCenter.realizationDate, 'yyyyMMdd');
            if (self.creationBeginFilter && self.creationEndFilter) {
              var initialDateFormatted = $filter('date')(self.creationBeginFilter, 'yyyyMMdd');
              var finalDateFormatted = $filter('date')(self.creationEndFilter, 'yyyyMMdd');
              if(initialDateFormatted <= finalDateFormatted){
                return (lotFormattedData >= initialDateFormatted && lotFormattedData <= finalDateFormatted);
              }else{
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
          })
          .filter(function (filteredByPeriod) {
          if (self.examFilter.length && self.examFilter !== "ALL") {
            return filteredByPeriod.aliquotName === self.examFilter;
          } else {
            return filteredByPeriod;
          }
        });
      }
    }
  }
}());