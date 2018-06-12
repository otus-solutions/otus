(function () {
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
        questionnairesList: '=',
        uniqueDatesList: '='
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

  function Controller(ProjectFieldCenterService, ExamLotService, $mdToast, laboratoryContextService, dashboardContextService, $filter) {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    self.fieldCenter = "";
    self.selectedFieldCenters = [];
    self.questionnaireInfo = undefined;
    self.startDateInfo = undefined;
    self.endDateInfo = undefined;
    self.examFilter = "";
    self.realizationBeginFilter = "";
    self.realizationEndFilter = "";
    self.centers = [];


    /* Public methods */
    self.onFilter = onFilter;

    function onInit() {
      ProjectFieldCenterService.loadCenters().then(function (result) {
        self.centers = $filter('orderBy')(self.centers);
        result.forEach(function (fieldCenter) {
          self.centers.push(fieldCenter.acronym);
          self.selectedFieldCenters[fieldCenter.acronym] = true;
        });
        onFilter();
      });
    }

    function onFilter() {
      var selected = [];
      for (var center in self.selectedFieldCenters) {
        if (self.selectedFieldCenters[center])
          selected.push(center);
      }
      // checa se a data de inicio e fim fazem sentido
      if (self.startDateInfo && self.endDateInfo) {
        var startNumbers = self.startDateInfo.split('/').map(function (item) {
          return parseInt(item, 10);
        });

        var endNumbers = self.endDateInfo.split('/').map(function (item) {
          return parseInt(item, 10);
        });

        if ((startNumbers[1] - endNumbers[1] == 0) && (startNumbers[0] - endNumbers[0] > 0)) {
          showInvalidDateMessage();
        }
        else if (startNumbers[1] - endNumbers[1] > 0) {
          showInvalidDateMessage();
        }
        else {
          if (self.questionnaireInfo && selected.length) {
            self.parseData(selected, self.questionnaireInfo, self.startDateInfo, self.endDateInfo);
          }
        }
      }
    }

    function showInvalidDateMessage() {
      var msgDataInvalida = "Datas inválidas! A data inicial deve ser menor que a data final.";
      $mdToast.show(
        $mdToast.simple()
          .textContent(msgDataInvalida)
          .hideDelay(4000)
      );
    }

  }
}());
