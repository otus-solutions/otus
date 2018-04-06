(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusMonitoringDashboard', {
      controller: Controller,
      templateUrl: 'app/ux-component/otus-monitoring/otus-monitoring-dashboard-template.html'
    });

  Controller.$inject = [
    'otusjs.deploy.MonitoringRestService'
    //'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(MonitoringRestService) {
    var self = this;

    self.fieldCenter;

    self.questionnairesList;
    self.uniqueDatesList;
    self.fieldCentersList;

    self.questionnaireData;

    self.createQuestionnaireSpreadsheet;
    self.createQuestionnaireLineChart;
    self.parseData = parseData;
    self.preProcessingData = preProcessingData;

    // lifecycle hooks
    self.$onInit = onInit;

    /* Public methods */
    function onInit() {
      console.log(MonitoringRestService.create());

      preProcessingData();
      
    }

    function preProcessingData() {
      $.getJSON("app/ux-component/otus-monitoring/relatorio-acompanhamento.json", function (json) {

        //var rawData = json.filter(filterByAcronym, acronym);
        var rawData = json;
        var allDates = rawData.map(function (e) {
          //return [e.month,e.year];
          return e.month + "/" + e.year;
        });

        //var uniqueDates = [];
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

        parseData("",self.questionnairesList[0]);
      });
      
    }

    function parseData(fieldCenter, acronym) {

      if (self.createQuestionnaireLineChart) {

        var datasetInformation = {
          "MG":{ "name": "Minas Gerais", "backgroundColor": "rgba(255, 99, 132, 0.2)", "borderColor": "rgba(255, 99, 132, 1)" },
          "SP":{ "name": "São Paulo", "backgroundColor": "rgba(54, 162, 235, 0.2)", "borderColor": "rgba(54, 162, 235, 1)" },
          "RS":{ "name": "Rio Grande do Sul", "backgroundColor": "rgba(75, 192, 192, 0.2)", "borderColor": "rgba(75, 192, 192, 1)" },
          "RJ":{ "name": "Rio de Janeiro", "backgroundColor": "rgba(127, 190, 102, 0.2)", "borderColor": "rgba(127, 190, 102, 1)" },
          "ES":{ "name": "Espírito Santo", "backgroundColor": "rgba(153, 102, 255, 0.2)", "borderColor": "rgba(153, 102, 255, 1)" },
          "BA":{ "name": "Bahia", "backgroundColor": "rgba(255, 163, 102, 0.2)", "borderColor": "rgba(255, 163, 102, 1)" }
        };

        $.getJSON("app/ux-component/otus-monitoring/relatorio-acompanhamento.json", function (json) {

          var datasets = [];
          var rawData = json.filter(function(value){
            return value.acronym == this;
          }, acronym);

          var allDates = rawData.map(function (e) {
            //return [e.month,e.year];
            return e.month + "/" + e.year;
          });


          for (var j = 0; j < self.fieldCentersList.length; j++) {
            var dataByFieldCenter = rawData.filter(function(value){
              return value.fieldCenter == this;
            }, self.fieldCentersList[j]);
            var i = 0;
            var fieldCenterDataset = [];
            for (var k = 0; k < self.uniqueDatesList.length; k++) {

              var date = self.uniqueDatesList[k].split('/').map(function (item) {
                return parseInt(item, 10);
              });

              if (dataByFieldCenter[i] &&
                dataByFieldCenter[i].month == date[0] &&
                dataByFieldCenter[i].year == date[1]) {
                fieldCenterDataset[k] = dataByFieldCenter[i].sum;
                i++;
              }
              else {
                fieldCenterDataset[k] = 0;
              }

            }
            //console.log(dataByFieldCenter);
            datasets[j] = {
              label: datasetInformation[self.fieldCentersList[j]].name,
              data: fieldCenterDataset,
              backgroundColor: datasetInformation[self.fieldCentersList[j]].backgroundColor,
              borderColor: datasetInformation[self.fieldCentersList[j]].borderColor,
              borderWidth: 1
            }

            /*self.datasets[j] = dataByFieldCenter.map(function (e) {
                return e.sum;
            });*/

          }

          self.questionnaireData = {
            data: datasets,
            fieldCenters: self.fieldCentersList,
            dates: self.uniqueDatesList
          };

          self.createQuestionnaireLineChart(self.questionnaireData);
          self.createQuestionnaireSpreadsheet(self.questionnaireData);

        });


      }
    }
  }
}());
