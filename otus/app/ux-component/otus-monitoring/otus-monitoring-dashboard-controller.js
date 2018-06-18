(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusMonitoringDashboardCtrl', Controller);

  Controller.$inject = [
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.monitoring.business.MonitoringService',
    'otusjs.deploy.LoadingScreenService',
    'otusMonitorParseDataFactory'
  ];

  function Controller(ProjectFieldCenterService, MonitoringService, LoadingScreenService, MonitorParseData) {
    var self = this;
    self.parseData = MonitorParseData.create;
    self.preProcessingData = preProcessingData;
    self.update = update;

    // lifecycle hooks
    self.$onInit = onInit;
    var messageLoading = 'Por favor aguarde o carregamento dos dados.<br> Esse processo pode demorar um pouco...';


    /* Public methods */
    function onInit() {
      _loadAllCenters();
      LoadingScreenService.changeMessage(messageLoading);
      LoadingScreenService.start();

      // TODO: TIAGO
      MonitoringService.listAcronyms()
        .then(function(activities) {
          self.questionnairesList = activities.map(function(acronym) {
            return acronym;
          }).filter(function(elem, index, self) {
            return index == self.indexOf(elem);
          });
          // TODO: avaliar se é necessário
          self.update(self.questionnairesList[0], undefined);

          LoadingScreenService.finish();
        });

    }

    function _loadAllCenters() {
      ProjectFieldCenterService.loadCenters().then(function(result) {
        self.centers = angular.copy(result);
      });
    }

    function _sortDateList() {
      return self.uniqueDatesList.sort(function(a, b) {
        var numbersA = a.split('/').map(function(item) {
          return parseInt(item, 10);
        });
        var numbersB = b.split('/').map(function(item) {
          return parseInt(item, 10);
        });
        return numbersA[1] - numbersB[1] == 0 ? numbersA[0] - numbersB[0] : numbersA[1] - numbersB[1];
      });
    }

    function preProcessingData() {
      var rawData = angular.copy(self.monitoringData);
      self.uniqueDatesList = rawData.map(function(e) {
        return e.month + "/" + e.year;
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
        self.createQuestionnaireLineChart,
        _loadDataSetInformation());
    }

    function update(acronym, questionnaireData) {
      MonitoringService.find(acronym)
        .then(function(response) {
          self.monitoringData = angular.copy(response);
          self.preProcessingData();
        });
      self.questionnaireData = questionnaireData || MonitorParseData.create(self.fieldCentersList,
        self.questionnairesList[0],
        self.uniqueDatesList[0],
        self.uniqueDatesList[self.uniqueDatesList.length - 1]);
      self.createQuestionnaireLineChart(self.questionnaireData);
      self.createQuestionnaireSpreadsheet(self.questionnaireData);
      self.createInformationCards(self.questionnaireData);
      self.createCumulativeResultsChart(self.questionnaireData);
      self.createCentersGoalsChart(self.questionnaireData);

      self.ready = true;
    }
    // TODO: espera o novo endpoint
    function _loadDataSetInformation() {
      var _dataOfCenters = {};
      var i = 0; //  MG    SP    RS  RJ   ES   BA
      var _goals = [3025, 4895, 1999, 1745, 1024, 1945];
      self.centers.forEach(function(fieldCenter) {
        _dataOfCenters[fieldCenter.acronym] = fieldCenter;
        _dataOfCenters[fieldCenter.acronym].goal = _goals[i];
        i++;
      });
      return _dataOfCenters;
    }
  }
}());
