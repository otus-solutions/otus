(function () {
  'use strict';

  angular
    .module('otusjs.report.business')
    .factory('otusjs.report.business.ParticipantReportWidgetFactory', factory);


  factory.$inject = [
    '$q',
    'otusjs.report.business.ParticipantReportService'
  ];

  function factory($q, ParticipantReportService) {
    var self = this;

    self.getParticipantReportList = getParticipantReportList;
    self.fromJson = fromJson;

    function getParticipantReportList(participant) {
      return ParticipantReportService.fetchReportList(participant)
        .then(function (reports) {
          return reports.map(function (report) {
            return new ParticipantReport(ParticipantReportService, report, participant)
          });
        });
    }

    function fromJson(jsonReport, participant) {
      return new ParticipantReport(ParticipantReportService, jsonReport, participant)
    }

    return self;
  }

  function ParticipantReport(ParticipantReportService, report, participant) {
    var self = this;
    var _participantInfo = participant;

    self.objectType = 'ParticipantReport';
    self.id = report.id;
    self.label = report.label;

    self.template = '';
    self.dataSources = {};
    self.missingDataSources = [];
    self.hasError = false;

    //ux-properties
    self.isAvailable = null;  //null when we don't know yet if it's available
    self.loading = false;
    self.statusColor = 'gray';
    self.statusIcon = 'priority_high';

    self.getReportTemplate = getReportTemplate;
    self.reloadTemplate = reloadTemplate;


    function getReportTemplate() {
      self.loading = true;
      self.hasError = false;

      return ParticipantReportService.getFullReport(_participantInfo, self.id)
        .then(function (data) {
          _manageDatasources(data.dataSources);
          _manageTemplate(data.template);
          self.loading = false;
        })
        .catch(function (e) {
          self.hasError = true;
          self.loading = false;
        });
    }

    function reloadTemplate() {
      self.getReportTemplate();
    }

    function _manageDatasources(dataSourceList) {
      self.missingDataSources = [];

      dataSourceList.forEach(function (ds) {
        var dsKey = ds.key;
        if (ds.result[0]) {
          self.dataSources[dsKey] = ds.result;
        } else {
          self.missingDataSources.push(ds.label);
        }
      });
      if (self.missingDataSources.length > 0) {
        _setAvailability(false);
      } else {
        _setAvailability(true);
      }
    }

    function _manageTemplate(template){
      self.template = template;
    }

    function _setAvailability(isAvailable) {
      self.isAvailable = isAvailable;
      self.statusColor = isAvailable === true ? 'green' : 'red';
      self.statusIcon = isAvailable === true ? 'done' : 'cancel';
    }
  }
}());
