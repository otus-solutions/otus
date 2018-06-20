(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .factory('otusMonitorParseDataFactory', Factory);

    Factory.$inject = ['otusjs.monitoring.business.MonitoringService'];

    function Factory(MonitoringService) {
      var self = this;

      self.create = create;
      self.init = init;



      function init(datesList, activityData, QuestionnaireLineChart, setInformation) {
        self.uniqueDatesList = datesList;
        self.monitoringData = activityData;
        self.createQuestionnaireLineChart = QuestionnaireLineChart;
        self.datasetInformation = setInformation;
      }

      function create(selectedFieldCentersList, acronym, startDate, endDate) {

        // filtro do array das datas para conter apenas as que existem no intervalo selecionado pelo usuario
        var _filteredDates = self.uniqueDatesList.slice(self.uniqueDatesList.indexOf(startDate));
        _filteredDates = _filteredDates.slice(0, _filteredDates.indexOf(endDate) + 1);

        if (self.createQuestionnaireLineChart) {
          var datasets = [];
          var rawData = self.monitoringData.filter(function(value) {
            return value.acronym == this;
          }, acronym);

          var startNumbers = startDate.split('/').map(function(item) {
            return parseInt(item, 10);
          });

          // filtra as informacoes de datas fora do intervalo
          rawData = rawData.filter(function(value) {
            return (((this[1] - value.year == 0) &&
                (this[0] - value.month <= 0)) ||
              (this[1] - value.year < 0));

          }, startNumbers);

          var endNumbers = endDate.split('/').map(function(item) {
            return parseInt(item, 10);
          });

          // filtra as informacoes de datas fora do intervalo
          rawData = rawData.filter(function(value) {
            return (((this[1] - value.year == 0) &&
                (this[0] - value.month >= 0)) ||
              (this[1] - value.year > 0));

          }, endNumbers);

          for (var j = 0; j < selectedFieldCentersList.length; j++) {

            // separa dados por field center
            var dataByFieldCenter = rawData.filter(function(value) {
              return value.fieldCenter == this;
            }, selectedFieldCentersList[j]);

            var i = 0;
            var fieldCenterDataset = [];
            var _lengthOfDates = _filteredDates.length;
            for (var k = 0; k < _lengthOfDates; k++) {

              // parser da data, para adquirir valor de mes e ano
              var date = _filteredDates[k].split('/').map(function(item) {
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
              label: self.datasetInformation[selectedFieldCentersList[j]].name,
              data: fieldCenterDataset,
              goal: self.datasetInformation[selectedFieldCentersList[j]].goal,
              backgroundColor: self.datasetInformation[selectedFieldCentersList[j]].backgroundColor,
              borderColor: self.datasetInformation[selectedFieldCentersList[j]].borderColor,
              borderWidth: 1
            };
          }

          return {
            data: datasets,
            fieldCenters: selectedFieldCentersList,
            dates: _filteredDates
          };
        }
      }

      return self;

    }
}());
