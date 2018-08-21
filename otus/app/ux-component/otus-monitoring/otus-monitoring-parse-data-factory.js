(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .factory('otusMonitorParseDataFactory', Factory);

  function Factory() {
    var self = this;

    self.create = create;
    self.init = init;



    function init(datesList, activityData, QuestionnaireLineChart, setInformation) {
      self.uniqueDatesList = datesList;
      self.monitoringData = activityData;
      self.createQuestionnaireLineChart = QuestionnaireLineChart;
      self.datasetInformation = setInformation;
    }

    function _convertDateList() {
      var _uniqueDatesList = angular.copy(self.uniqueDatesList);
      _uniqueDatesList = _uniqueDatesList.map(function(elem) {
        return new Date(elem);
      }).map(function(item) {
        return item.getTime();
      });
      return _uniqueDatesList;
    }


    function _findDate(date, type) {
      var dateInfo = new Date(date).getTime();
      var dateListConverted = _convertDateList();
      var position = null;
      var closestDate = null;

      if (type === "startDate") {
        if (dateInfo > dateListConverted[dateListConverted.length - 1]) {
          return String(date);
        }
      }

      if (type === "endDate") {
        if (dateInfo < dateListConverted[0]) {
          return String(date);
        }
      }
      if (dateListConverted.length) {
        closestDate = dateListConverted.reduce(function(last, current) {
          return (Math.abs(current - dateInfo) < Math.abs(last - dateInfo) ? current : last);
        });
      }

      dateListConverted.find(function(elem, index) {
        if (elem === closestDate) {
          position = angular.copy(index);
        }
      });

      return angular.copy(self.uniqueDatesList[position]);
    }

    function create(acronym, selectedFieldCentersList, startDate, endDate) {
      if (selectedFieldCentersList && acronym && startDate && endDate) {
        startDate = _findDate(startDate, "startDate");
        endDate = _findDate(endDate, "endDate");
        var _filteredDates = self.uniqueDatesList.slice(self.uniqueDatesList.indexOf(startDate));
        _filteredDates = _filteredDates.slice(0, _filteredDates.indexOf(endDate) + 1);

        if (self.createQuestionnaireLineChart) {
          var datasets = [];
          var rawData = self.monitoringData.filter(function(value) {
            return value.acronym == this;
          }, acronym);

          var startNumbers = startDate.split('-').map(function(item) {
            return parseInt(item, 10);
          });

          rawData = rawData.filter(function(value) {
            return (((this[0] - value.year == 0) &&
                (this[1] - value.month <= 0)) ||
              (this[0] - value.year < 0));

          }, startNumbers);

          var endNumbers = endDate.split('-').map(function(item) {
            return parseInt(item, 10);
          });

          rawData = rawData.filter(function(value) {
            return (((this[0] - value.year == 0) &&
                (this[1] - value.month >= 0)) ||
              (this[0] - value.year > 0));

          }, endNumbers);

          for (var j = 0; j < selectedFieldCentersList.length; j++) {
            var dataByFieldCenter = rawData.filter(function(value) {
              return value.fieldCenter == this;
            }, selectedFieldCentersList[j]);

            var i = 0;
            var fieldCenterDataset = [];
            var _lengthOfDates = _filteredDates.length;
            for (var k = 0; k < _lengthOfDates; k++) {
              var date = _filteredDates[k].split('-').map(function(item) {
                return parseInt(item, 10);
              });

              if(dataByFieldCenter){
                fieldCenterDataset[k] = 0;
                dataByFieldCenter.forEach(function (fieldCenterData) {
                  if(fieldCenterData.month == date[1] && fieldCenterData.year == date[0]){
                    fieldCenterDataset[k] = parseInt(fieldCenterData.sum);
                  }
                })
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

      } else {
        return {
          data: [],
          fieldCenters: [],
          dates: []
        };

      }
    }

    return self;
  }
}());
