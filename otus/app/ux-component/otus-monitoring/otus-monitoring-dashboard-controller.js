(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusMonitoringDashboardCtrl', Controller);

  Controller.$inject = [
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.monitoring.business.MonitoringService',
    'otusjs.deploy.LoadingScreenService',
    'otusMonitorParseData'
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
      MonitoringService.list()
        .then(function(list) {
          self.jsonData = list;
          preProcessingData();
          self.update();
          self.ready = true;
          LoadingScreenService.finish();
        })
        .catch(function(err) {
          LoadingScreenService.finish();
          console.log(err);
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
      var rawData = self.jsonData;
      self.uniqueDatesList = rawData.map(function(e) {
        return e.month + "/" + e.year;
      }).filter(function(elem, index, self) {
        return index == self.indexOf(elem);
      });

      self.uniqueDatesList = _sortDateList();

      self.questionnairesList = rawData.map(function(e) {
        return e.acronym;
      }).filter(function(elem, index, self) {
        return index == self.indexOf(elem);
      });

      self.fieldCentersList = rawData.map(function(e) {
        return e.fieldCenter;
      }).filter(function(elem, index, self) {
        return index == self.indexOf(elem);
      });
    }

    function update(questionnaireData) {
      MonitorParseData.init(
        self.uniqueDatesList,
        self.jsonData,
        self.createQuestionnaireLineChart,
        _loadDataSetInformation());
      self.questionnaireData = questionnaireData || MonitorParseData.create(self.fieldCentersList,
        self.questionnairesList[0],
        self.uniqueDatesList[0],
        self.uniqueDatesList[self.uniqueDatesList.length - 1]);
      self.createQuestionnaireLineChart(self.questionnaireData);
      self.createQuestionnaireSpreadsheet(self.questionnaireData);
      self.createInformationCards(self.questionnaireData);
      self.createCumulativeResultsChart(self.questionnaireData);
      self.createCentersGoalsChart(self.questionnaireData);
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
