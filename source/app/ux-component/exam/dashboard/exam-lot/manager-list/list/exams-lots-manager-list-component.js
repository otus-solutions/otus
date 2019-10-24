(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusExamsLotsManagerList', {
      controller: Controller,
      templateUrl: 'app/ux-component/exam/dashboard/exam-lot/manager-list/list/exams-lots-manager-list-template.html',
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
    self.realizationBeginFilter = "";
    self.realizationEndFilter = "";
    self.centers = [];
    // self.exams = [];
    self.lotsList = [];
    self.lotsListImutable = [];


    /* Public methods */
    self.selectLot = selectLot;
    self.updateOnDelete = updateOnDelete;
    self.onFilter = onFilter;
    self.changeCenter = changeCenter;
    self.loadExamDescriptors = loadExamDescriptors;

    function onInit() {
      ProjectFieldCenterService.loadCenters().then(function (result) {
        self.lotDataSet = [];
        self.colorSet = [];
        self.centers = $filter('orderBy')(self.centers);
        result.forEach(function (fieldCenter) {
          self.centers.push(fieldCenter.acronym)
        });
        _setUserFieldCenter();

      });
      self.otusExamsLotsManager.listComponent = self;
    }

    function loadExamDescriptors(center) {
      self.exams = [];
      ExamLotService.getAvailableExams(center).then(function (result) {
        result.forEach(function (aliquotTypes) {
          self.exams.push(aliquotTypes);
        });
      });
    }

    function _setUserFieldCenter() {
      dashboardContextService
        .getLoggedUser()
        .then(function(userData) {
          self.userHaveCenter = !!userData.fieldCenter.acronym;
          self.centerFilter = self.userHaveCenter ? userData.fieldCenter.acronym : laboratoryContextService.getSelectedExamLotFieldCenter() ? laboratoryContextService.getSelectedExamLotFieldCenter() : "";
          if(!self.centerFilter){
            self.centerFilter = self.centers[0];
          }
          loadExamDescriptors(self.centerFilter);
          laboratoryContextService.setSelectedExamLotFieldCenter(self.centerFilter);
          self.centerFilterDisabled = userData.fieldCenter.acronym ? "disabled" : "";
          _LoadLotsList();
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
      ExamLotService.getLots(self.centerFilter).then(function(response) {
        self.lotsList = response;
        self.lotsListImutable = response;
        self.onFilter();
      });
    }

    function changeCenter() {
      _LoadLotsList();
    }

    function onFilter(){
      self.selectedLots = [];
      _setSessionData();
      if(self.lotsListImutable.length) {
        self.lotsList = self.lotsListImutable
          .filter(function (FilteredByCenter) {
            return _filterByPeriod(FilteredByCenter);
          })
          .filter(function (filteredByPeriod) {
            return _filterByExam(filteredByPeriod)
        });
      }
    }

    function _filterByPeriod(FilteredByCenter) {
      var lotFormattedData = $filter('date')(FilteredByCenter.realizationDate, 'yyyyMMdd');
      if (self.realizationBeginFilter && self.realizationEndFilter) {
        var initialDateFormatted = $filter('date')(self.realizationBeginFilter, 'yyyyMMdd');
        var finalDateFormatted = $filter('date')(self.realizationEndFilter, 'yyyyMMdd');
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
    }

    function _filterByExam(filteredByPeriod) {
      if (self.examFilter.length && self.examFilter !== "ALL") {
        return filteredByPeriod.aliquotName === self.examFilter;
      } else {
        return filteredByPeriod;
      }
    }

    function _setSessionData(){
      if(self.centerFilter.length){
        laboratoryContextService.setSelectedExamLotFieldCenter(self.centerFilter);
      }
      if(self.centerFilter.length){
        laboratoryContextService.setSelectedExamType(self.examFilter);
      }
    }
  }
}());