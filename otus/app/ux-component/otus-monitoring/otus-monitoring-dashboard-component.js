(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusMonitoringDashboard', {
      controller: Controller,
      templateUrl: 'app/ux-component/otus-monitoring/otus-monitoring-dashboard-template.html'
    });

  Controller.$inject = [
    'otusjs.monitoring.business.MonitoringService'
  ];

  function Controller(MonitoringService) {
    var self = this;

    self.fieldCenter;

    self.questionnairesList;
    self.uniqueDatesList;
    self.fieldCentersList;

    self.questionnaireData;


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
      MonitoringService.list()
        .then(function (list) {
          console.log(list);
          preProcessingData(list);
        })
        .catch(function (e) {
          console.log(e);
        });
    }

    function preProcessingData(json) {

      var rawData = json;
      var allDates = rawData.map(function (e) {
        return e.month + "/" + e.year;
      });

      self.uniqueDatesList = allDates.filter(function (elem, index, self) {
        return index == self.indexOf(elem);
      });

      self.uniqueDatesList = self.uniqueDatesList.sort(function (a, b) {
        var numbersA = a.split('/').map(function (item) {
          return parseInt(item, 10);
        });

        var numbersB = b.split('/').map(function (item) {
          return parseInt(item, 10);
        });

        if (numbersA[1] - numbersB[1] == 0) {
          return numbersA[0] - numbersB[0];
        }
        else
          return numbersA[1] - numbersB[1];


      });

      var allAcronyms = rawData.map(function (e) {
        return e.acronym;
      });

      self.questionnairesList = allAcronyms.filter(function (elem, index, self) {
        return index == self.indexOf(elem);
      });

      var allFieldCenters = rawData.map(function (e) {
        return e.fieldCenter;
      });

      self.fieldCentersList = allFieldCenters.filter(function (elem, index, self) {
        return index == self.indexOf(elem);
      });

      parseData(self.fieldCentersList,
        self.questionnairesList[0],
        self.uniqueDatesList[0],
        self.uniqueDatesList[self.uniqueDatesList.length - 1]);

    }

    function parseData(selectedFieldCentersList, acronym, startDate, endDate) {

      // filtro do array das datas para conter apenas as que existem no intervalo selecionado pelo usuario
      var filteredDates = self.uniqueDatesList.slice(self.uniqueDatesList.indexOf(startDate));
      filteredDates = filteredDates.slice(0, filteredDates.indexOf(endDate) + 1);

      if (self.createQuestionnaireLineChart) {

        var datasetInformation = {
          "MG": { "name": "Minas Gerais", "goal": 3025, "backgroundColor": "rgba(255, 99, 132, 0.2)", "borderColor": "rgba(255, 99, 132, 1)" },
          "SP": { "name": "São Paulo", "goal": 4895, "backgroundColor": "rgba(54, 162, 235, 0.2)", "borderColor": "rgba(54, 162, 235, 1)" },
          "RS": { "name": "Rio Grande do Sul", "goal": 1999, "backgroundColor": "rgba(75, 192, 192, 0.2)", "borderColor": "rgba(75, 192, 192, 1)" },
          "RJ": { "name": "Rio de Janeiro", "goal": 1745, "backgroundColor": "rgba(127, 190, 102, 0.2)", "borderColor": "rgba(127, 190, 102, 1)" },
          "ES": { "name": "Espírito Santo", "goal": 1024, "backgroundColor": "rgba(153, 102, 255, 0.2)", "borderColor": "rgba(153, 102, 255, 1)" },
          "BA": { "name": "Bahia", "goal": 1945, "backgroundColor": "rgba(255, 163, 102, 0.2)", "borderColor": "rgba(255, 163, 102, 1)" }
        };

        MonitoringService.list()
          .then(function (json) {
            console.log(json);
            var datasets = [];
            var rawData = json.filter(function (value) {
              return value.acronym == this;
            }, acronym);

            var startNumbers = startDate.split('/').map(function (item) {
              return parseInt(item, 10);
            });

            // filtra as informacoes de datas fora do intervalo
            rawData = rawData.filter(function (value) {
              return (((this[1] - value.year == 0) &&
                (this[0] - value.month <= 0)) ||
                (this[1] - value.year < 0))

            }, startNumbers);

            var endNumbers = endDate.split('/').map(function (item) {
              return parseInt(item, 10);
            });

            // filtra as informacoes de datas fora do intervalo
            rawData = rawData.filter(function (value) {
              return (((this[1] - value.year == 0) &&
                (this[0] - value.month >= 0)) ||
                (this[1] - value.year > 0))

            }, endNumbers);

            for (var j = 0; j < selectedFieldCentersList.length; j++) {

              // separa dados por field center
              var dataByFieldCenter = rawData.filter(function (value) {
                return value.fieldCenter == this;
              }, selectedFieldCentersList[j]);

              var i = 0;
              var fieldCenterDataset = [];

              for (var k = 0; k < filteredDates.length; k++) {

                // parser da data, para adquirir valor de mes e ano
                var date = filteredDates[k].split('/').map(function (item) {
                  return parseInt(item, 10);
                });


                if (dataByFieldCenter[i] &&
                  dataByFieldCenter[i].month == date[0] &&
                  dataByFieldCenter[i].year == date[1]) {

                  fieldCenterDataset[k] = parseInt(dataByFieldCenter[i].sum);

                  i++;
                }
                else {
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
            console.log(self.questionnaireData);
            self.createQuestionnaireLineChart(self.questionnaireData);
            self.createQuestionnaireSpreadsheet(self.questionnaireData);
            self.createInformationCards(self.questionnaireData);
            self.createCumulativeResultsChart(self.questionnaireData);
            self.createCentersGoalsChart(self.questionnaireData);
          })
          .catch(function (e) {
            console.log(e);
          });

      }
    }

  }
}());
