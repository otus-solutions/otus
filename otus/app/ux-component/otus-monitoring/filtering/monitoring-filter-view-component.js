(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('monitoringFilterViewComponent', {
      controller: Controller,
      templateUrl: 'app/ux-component/otus-monitoring/filtering/monitoring-filter-view-template.html',
      bindings: {
        selectedLots: '=',
        csvData: '=',
        parseData: '=',
        questionnairesList:'='
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

    self.fieldCenter = "";
    self.questionnaireInfo = "ACTA";
    self.examFilter = "";
    self.realizationBeginFilter = "";
    self.realizationEndFilter = "";
    self.centers = [];
    // self.exams = [];


    /* Public methods */
    self.onFilter = onFilter;

    function onInit() {
      ProjectFieldCenterService.loadCenters().then(function (result) {

        self.centers = $filter('orderBy')(self.centers);
        result.forEach(function (fieldCenter) {
          self.centers.push(fieldCenter.acronym)
        });


      });
     // self.otusExamsLotsManager.listComponent = self;
      
    }

    function onFilter(){

      self.parseData(self.fieldCenter,self.questionnaireInfo);
      /*
      self.selectedLots = [];
      _setSessionData();
      if(self.lotsListImutable.length) {
        self.lotsList = self.lotsListImutable
          .filter(function (lot) {
            return _filterByCenter(lot);
          })
          .filter(function (FilteredByCenter) {
            return _filterByPeriod(FilteredByCenter);
          })
          .filter(function (filteredByPeriod) {
            return _filterByExam(filteredByPeriod)
        });
      }*/
    }

    function _filterByCenter(lot) { /*
      if (self.centerFilter.length) {

        return lot.fieldCenter.acronym == self.centerFilter;
      } else {
        return lot;
      } */
    }

    function _filterByPeriod(FilteredByCenter) { /*
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
      }*/
    }

  }
}());
