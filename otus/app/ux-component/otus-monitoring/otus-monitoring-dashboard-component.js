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
    'otusjs.monitoring.business.MonitoringService',
    'otusjs.deploy.LoadingScreenService',
    'otusMonitorParseData'
  ];

  function Controller(ProjectFieldCenterService, MonitoringService, LoadingScreenService, MonitorParseData) {
    var self = this;
    self.fieldCenter;
    self.parseData = MonitorParseData.create;
    self.preProcessingData = preProcessingData;
    self.update = update;

    // lifecycle hooks
    self.$onInit = onInit;
    var messageLoading =
      'Por favor aguarde o carregamento dos dados.<br> Esse processo pode demorar um pouco...';

    /* Public methods */
    function onInit() {
      _loadAllCenters();
      LoadingScreenService.changeMessage(messageLoading);
      LoadingScreenService.start();
      MonitoringService.list()
        .then(function(list) {
          self.jsonData = list;
          preProcessingData();
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
      self.update();
      self.ready = true;
      LoadingScreenService.finish();
    }

    function update(questionnaireData) {
        MonitorParseData.init(
          self.uniqueDatesList,
          self.jsonData,
          self.createQuestionnaireLineChart,
          _loadDataSetInformation());

          if (questionnaireData) {
            self.questionnaireData = questionnaireData;
          }else {
            self.questionnaireData = MonitorParseData.create(self.fieldCentersList,
              self.questionnairesList[0],
              self.uniqueDatesList[0],
              self.uniqueDatesList[self.uniqueDatesList.length - 1]);
          }
          self.createQuestionnaireLineChart ? self.createQuestionnaireLineChart(self.questionnaireData) : null;
          self.createQuestionnaireSpreadsheet ? self.createQuestionnaireSpreadsheet(self.questionnaireData) : null;
          self.createInformationCards ? self.createInformationCards(self.questionnaireData) : null;
          self.createCumulativeResultsChart ? self.createCumulativeResultsChart(self.questionnaireData) : null;
          self.createCentersGoalsChart ? self.createCentersGoalsChart(self.questionnaireData) : null;
      }

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
