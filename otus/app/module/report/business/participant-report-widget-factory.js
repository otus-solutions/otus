(function () {
  'use strict';

  angular
    .module('otusjs.report.business')
    .factory('otusjs.report.business.ParticipantReportWidgetFactory', factory);


  factory.$inject = [
    '$q',
    'otusjs.report.business.ParticipantReportService',
    'otusjs.report.business.DynamicReportService'
  ];

  function factory($q, ParticipantReportService, DynamicReportService) {
    var self = this;

    self.getParticipantReportList = getParticipantReportList;
    self.fromJson = fromJson;

    function getParticipantReportList(participant) {
      return ParticipantReportService.fetchReportList(participant)
        .then(function (reports) {
          return reports.map(function (report) {
            return new ParticipantReport(ParticipantReportService, DynamicReportService, report, participant)
          });
        });
    }

    function fromJson(jsonReport, participant) {
      return new ParticipantReport(ParticipantReportService, DynamicReportService, jsonReport, participant)
    }

    return self;
  }

  function ParticipantReport(ParticipantReportService, DynamicReportService, report, participant) {
    var self = this;
    var _participantInfo = participant;

    self.objectType = 'ParticipantReport';
    self.id = report.id;
    self.label = report.label;

    self.template = '';
    self.dataSources = {};
    self.missingDataSources = [];
    self.fieldsError = [];
    self.compiledTemplate = undefined;
    self.hasError = false;

    //ux-properties
    self.hasAllDatasources = false;
    self.isAvailable = false;
    self.loading = false;
    self.status = {
      color: '#666666',
      icon: 'description',
      bottomIcon: '',
      bottomIconClass: '',
      tooltip: '',
      msg: '',
      expanded: false,
      expandAndCollapseIcon: 'keyboard_arrow_down',
      buttonEnabled: false
    };

    self.getReportTemplate = getReportTemplate;
    self.expandAndCollapse = expandAndCollapse;
    self.generateReport = generateReport;

    function expandAndCollapse() {
      self.status.expanded = !self.status.expanded;
      self.status.expandAndCollapseIcon = self.status.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
      if (self.status.expanded) getReportTemplate();
    }

    function generateReport() {
      DynamicReportService.openReportInNewTab(self);
    }

    function getReportTemplate() {
      self.loading = true;
      self.hasError = false;

      return ParticipantReportService.getFullReport(_participantInfo, self.id)
        .then(function (data) {
          _manageDatasources(data.dataSources);
          _manageTemplate(data.template);
          if (self.hasAllDatasources) {
            _precompileTemplate(_endLoading);
          } else {
            _endLoading();
          }
        })
        .catch(function (e) {
          self.hasError = true;
          _endLoading();
        });
    }

    function _endLoading() {
      _setStatus();
      self.loading = false;
    }

    function _precompileTemplate(callback) {
      DynamicReportService.precompile(self)
        .then(function (structure) {
          self.compiledTemplate = structure.compiledTemplate;
          self.fieldsError = structure.fieldsError;
          callback();
        })
        .catch(function (error) {
          callback();
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
      self.hasAllDatasources = self.missingDataSources.length ? false : true;
    }

    function _manageTemplate(template) {
      self.template = template;
    }

    function _setStatus() {
      self.isAvailable = false;
      self.status.buttonEnabled = false;

      if (self.hasError) {
        self.status.color = 'red';
        self.status.icon = 'cancel';
        self.status.bottomIcon = 'block';
        self.status.bottomIconClass = '';
        self.status.tooltip = 'Não encontrado';
        self.status.msg = 'Não encontrado';
      } else if (!self.hasAllDatasources) {
        self.status.color = '#CC6600';
        self.status.icon = 'priority_high';
        self.status.bottomIcon = 'block';
        self.status.bottomIconClass = '';
        self.status.tooltip = 'Indisponível';
        self.status.msg = 'Indisponível';
      } else if (self.fieldsError.length) {
        self.status.color = '#CC6600';
        self.status.icon = 'priority_high';
        self.status.bottomIcon = 'block';
        self.status.bottomIconClass = '';
        self.status.tooltip = 'Indisponível';
        self.status.msg = 'Indisponível';
      } else {
        self.isAvailable = true;
        self.status.color = 'green';
        self.status.icon = 'done';
        self.status.bottomIcon = 'reply';
        self.status.bottomIconClass = 'iconInverted';
        self.status.tooltip = 'Gerar Relatório';
        self.status.msg = 'Disponível';
        self.status.buttonEnabled = true;
      }
    }
  }
}());
