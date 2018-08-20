(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusMonitoringDashboardCtrl', Controller);

  Controller.$inject = [
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.monitoring.business.MonitoringService',
    'otusjs.deploy.LoadingScreenService',
    'otusMonitorParseDataFactory',
    'otusjs.model.monitoring.MonitoringCenterFactory',
    '$mdDialog',
    '$q'
  ];

  function Controller(
    ProjectFieldCenterService,
    MonitoringService,
    LoadingScreenService,
    MonitorParseData,
    MonitoringCenterFactory,
    $mdDialog,
    $q) {

    var self = this;
    self.parseData = MonitorParseData.create;
    self.preProcessingData = preProcessingData;
    self.update = update;

    self.questionnaireData = {};

    // lifecycle hooks
    self.$onInit = onInit;

    /* Public methods */
    function onInit() {
      LoadingScreenService.start();
      _loadAllCenters();
    }

    function _loadAllAcronyms() {
      MonitoringService.listAcronyms()
        .then(function(activities) {
          self.questionnairesList = activities.map(function(acronym) {
            return acronym;
          }).filter(function(elem, index, self) {
            return index == self.indexOf(elem);
          });

          self.update(self.questionnairesList[0], ["MG","RJ","SP","RS","BA","ES"], null, null).then(function() {
            self.selectedAcronym = angular.copy(self.questionnairesList[0]);
            self.ready = true;
          });
        });
    }

    function _loadAllCenters() {
      ProjectFieldCenterService.loadCenters().then(function(result) {
        self.centers = angular.copy(result);
        _loadDataSetInformation();
      });
    }

    function _sortDateList() {
      return self.uniqueDatesList.sort(function(a, b) {
        var numbersA = a.split('-').map(function(item) {
          return parseInt(item, 10);
        });
        var numbersB = b.split('-').map(function(item) {
          return parseInt(item, 10);
        });
        return numbersA[0] - numbersB[0] == 0 ? numbersA[1] - numbersB[1] : numbersA[0] - numbersB[0];
      });
    }

    function preProcessingData() {
      if (self.monitoringData) {
        var rawData = self.monitoringData || [];
        self.uniqueDatesList = rawData.map(function(e) {
          return e.year + "-" + e.month + "-1";
        }).filter(function(elem, index, self) {
          return index == self.indexOf(elem);
        });

        self.uniqueDatesList = _sortDateList();

        self.fieldCentersList = rawData.map(function(e) {
          return e.fieldCenter;
        }).filter(function(elem, index, self) {
          return index == self.indexOf(elem);
        });
        MonitorParseData.init(
          self.uniqueDatesList,
          self.monitoringData,
          self.createQuestionnaireLineChart,
          self.monitoringCenters);

        if (self.uniqueDatesList && self.fieldCentersList) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    function update(acronym, selectedCenters, startDate, endDate) {
      var deferred = $q.defer();
      if (!selectedCenters) {
        selectedCenters = [];
        self.centers.forEach(function(center) {
          selectedCenters.push(center.acronym);
        });
      }
      if(self.selectedAcronym != acronym) {
        MonitoringService.find(acronym)
          .then(function (response) {
            if (!response.length) {
              self.monitoringData = []
              _showMessages('Os dados não foram encontrados!', () => {
              });
            }
            self.monitoringData = response;
            _constructorData(deferred, startDate, endDate, selectedCenters, acronym);
            LoadingScreenService.finish();
          });
      }else {
        _constructorData(deferred, startDate, endDate, selectedCenters, acronym);
      }
      return deferred.promise;
    }

    function _constructorData(deferred, startDate, endDate, selectedCenters, acronym) {
      if (self.preProcessingData()) {
        var _startDate = startDate || self.uniqueDatesList[0];
        var _endDate = endDate || self.uniqueDatesList[self.uniqueDatesList.length - 1];
        var _selectedCenters = selectedCenters || self.fieldCentersList;
        self.questionnaireData = MonitorParseData.create(acronym, _selectedCenters, _startDate, _endDate);
        _build();
        deferred.resolve({
          startDate: _startDate,
          endDate: _endDate
        });
      } else {
        deferred.reject({});
      }
    }

    function _build() {
      self.createQuestionnaireLineChart(self.questionnaireData);
      self.createQuestionnaireSpreadsheet(self.questionnaireData);
      self.createInformationCards(self.questionnaireData);
      self.createCumulativeResultsChart(self.questionnaireData);
      self.createCentersGoalsChart(self.questionnaireData);
    }

    function _showMessages(msg, action) {
      var _msg = $mdDialog.alert()
        .title('ATENÇÃO')
        .textContent('Os dados não foram encontrados!')
        .ariaLabel('Confirmação de leitura')
        .ok('Ok');
      $mdDialog.show(_msg).then(function() {
        action();
      });

    }

    function _loadDataSetInformation() {
      var _dataOfCenters = {};
      MonitoringService.listCenters()
        .then(function(list) {
          var _list = list;
          self.centers.forEach(function(fieldCenter) {
            _dataOfCenters[fieldCenter.acronym] = MonitoringCenterFactory.create(_list.find(function(elem) {
              return elem.name === fieldCenter.name;
            }));
          });
          self.monitoringCenters = _dataOfCenters;
          _loadAllAcronyms();
        });

    }
  }
}());
