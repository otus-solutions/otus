(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusMonitoringDashboard', {
      controller: Controller,
      templateUrl: 'app/ux-component/otus-monitoring/otus-monitoring-dashboard-template.html'
    });

  Controller.$inject = [
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.monitoring.business.MonitoringService'
  ];

  function Controller(ProjectFieldCenterService, MonitoringService) {
    var self = this;

    self.fieldCenter;

    self.questionnairesList;
    self.uniqueDatesList;
    self.fieldCentersList;

    self.questionnaireData;

    self.jsonData;
    self.createInformationCards;
    self.createCentersGoalsChart;
    self.createCumulativeResultsChart;
    self.createQuestionnaireSpreadsheet;
    self.createQuestionnaireLineChart;
    self.parseData = parseData;
    self.preProcessingData = preProcessingData;

    // lifecycle hooks
    self.$onInit = onInit;

    /* Public methods */
    function onInit() {
      _loadAllCenters();
      MonitoringService.list()
        .then(function(list) {
          self.jsonData = list;
          preProcessingData();
        })
        .catch(function(e) {});
    }

    function _loadAllCenters() {
      var _centers = null;
      ProjectFieldCenterService.loadCenters().then(function(result) {
        self.centers = angular.copy(result);
      });
    }

    function preProcessingData() {
      var rawData = self.jsonData;
      var allDates = rawData.map(function(e) {
        return e.month + "/" + e.year;
      });

      self.uniqueDatesList = allDates.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
      });

      self.uniqueDatesList = self.uniqueDatesList.sort(function(a, b) {
        var numbersA = a.split('/').map(function(item) {
          return parseInt(item, 10);
        });

        var numbersB = b.split('/').map(function(item) {
          return parseInt(item, 10);
        });

        if (numbersA[1] - numbersB[1] == 0) {
          return numbersA[0] - numbersB[0];
        } else {
          return numbersA[1] - numbersB[1];
        }

      });

      var allAcronyms = rawData.map(function(e) {
        return e.acronym;
      });

      self.questionnairesList = allAcronyms.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
      });

      var allFieldCenters = rawData.map(function(e) {
        return e.fieldCenter;
      });

      self.fieldCentersList = allFieldCenters.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
      });

      parseData(self.fieldCentersList,
        self.questionnairesList[0],
        self.uniqueDatesList[0],
        self.uniqueDatesList[self.uniqueDatesList.length - 1]);
    }

    function _loadDataSetInformation() {
      var _test = {};
      var i = 0; //  MG    SP    RS  RJ   ES   BA
      var _goals = [3025, 4895, 1999, 1745, 1024, 1945];
      self.centers.forEach(function(fieldCenter) {
        _test[fieldCenter.acronym] = fieldCenter;
        _test[fieldCenter.acronym].goal = _goals[i];
        i++;
      });
      return _test;
    }

    function parseData(selectedFieldCentersList, acronym, startDate, endDate) {

      // filtro do array das datas para conter apenas as que existem no intervalo selecionado pelo usuario
      var filteredDates = self.uniqueDatesList.slice(self.uniqueDatesList.indexOf(startDate));
      filteredDates = filteredDates.slice(0, filteredDates.indexOf(endDate) + 1);

      if (self.createQuestionnaireLineChart) {

        var datasetInformation = _loadDataSetInformation();


        var datasets = [];
        var rawData = self.jsonData.filter(function(value) {
          return value.acronym == this;
        }, acronym);

        var startNumbers = startDate.split('/').map(function(item) {
          return parseInt(item, 10);
        });

        // filtra as informacoes de datas fora do intervalo
        rawData = rawData.filter(function(value) {
          return (((this[1] - value.year == 0) &&
              (this[0] - value.month <= 0)) ||
            (this[1] - value.year < 0))

        }, startNumbers);

        var endNumbers = endDate.split('/').map(function(item) {
          return parseInt(item, 10);
        });

        // filtra as informacoes de datas fora do intervalo
        rawData = rawData.filter(function(value) {
          return (((this[1] - value.year == 0) &&
              (this[0] - value.month >= 0)) ||
            (this[1] - value.year > 0))

        }, endNumbers);

        for (var j = 0; j < selectedFieldCentersList.length; j++) {

          // separa dados por field center
          var dataByFieldCenter = rawData.filter(function(value) {
            return value.fieldCenter == this;
          }, selectedFieldCentersList[j]);

          var i = 0;
          var fieldCenterDataset = [];

          for (var k = 0; k < filteredDates.length; k++) {

            // parser da data, para adquirir valor de mes e ano
            var date = filteredDates[k].split('/').map(function(item) {
              return parseInt(item, 10);
            });


            if (dataByFieldCenter[i] &&
              dataByFieldCenter[i].month == date[0] &&
              dataByFieldCenter[i].year == date[1]) {

              fieldCenterDataset[k] = parseInt(dataByFieldCenter[i].sum);

              i++;
            } else {
              fieldCenterDataset[k] = 0;
            }

          }

          datasets[j] = {
            label: datasetInformation[selectedFieldCentersList[j]].name,
            data: fieldCenterDataset,
            goal: datasetInformation[selectedFieldCentersList[j]].goal,
            backgroundColor: datasetInformation[selectedFieldCentersList[j]].backgroundColor,
            borderColor: datasetInformation[selectedFieldCentersList[j]].borderColor,
            borderWidth: 1
          }

        }

        self.questionnaireData = {
          data: datasets,
          fieldCenters: selectedFieldCentersList,
          dates: filteredDates
        };

        self.createQuestionnaireLineChart ? self.createQuestionnaireLineChart(self.questionnaireData) : null;
        self.createQuestionnaireSpreadsheet ? self.createQuestionnaireSpreadsheet(self.questionnaireData) : null;
        self.createInformationCards ? self.createInformationCards(self.questionnaireData) : null;
        self.createCumulativeResultsChart ? self.createCumulativeResultsChart(self.questionnaireData) : null;
        self.createCentersGoalsChart ? self.createCentersGoalsChart(self.questionnaireData) : null;

        self.ready = true;
      }
    }

  }
}());
