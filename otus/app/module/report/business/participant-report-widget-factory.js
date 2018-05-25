(function () {
  'use strict';

  angular
    .module('otusjs.report.business')
    .factory('otusjs.report.business.ParticipantReportWidgetFactory', factory);


  factory.$inject = [
    '$q',
    'otusjs.report.business.ParticipantReportService',
    'otusjs.report.business.dynamicReport.DynamicReportService',
    'otusjs.report.business.datasourceManager.DatasourceManagerFactory'
  ];

  function factory($q, ParticipantReportService, DynamicReportService, DatasourceManagerFactory) {
    var self = this;

    self.getParticipantReportList = getParticipantReportList;
    self.fromJson = fromJson;

    function getParticipantReportList(participant) {
      return ParticipantReportService.fetchReportList(participant)
        .then(function (reports) {
          return reports.map(function (report) {
            return new ParticipantReport($q, ParticipantReportService, DynamicReportService, DatasourceManagerFactory, report, participant)
          });
        });
    }

    function fromJson(jsonReport, participant) {
      return new ParticipantReport($q, ParticipantReportService, DynamicReportService, DatasourceManagerFactory, jsonReport, participant)
    }

    return self;
  }

  function ParticipantReport($q, ParticipantReportService, DynamicReportService, DatasourceManagerFactory, report, participant) {
    var self = this;
    var _participantInfo = participant;
    const _loadingMessage = `
    <style>
      .close-button:hover {
        background-color: #3b4796;
        border: 2px solid #3b4796;
        color: white;
      }
      .close-button {
        padding: 10px;
        text-align: center;
        -webkit-transition-duration: 0.4s;/* Safari */
        transition-duration: 0.4s;
        background-color: #3883ff;
        border: 2px solid #3883ff;
        color: white;
        border-radius: 3px;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);
     }
    </style>
    Aguardando o fim da impressão, ou fechamento da visualização do relatório. 
    <br/>
    <br/>
    <button class="close-button" onclick="window.otusCloseDynamicReport()">
      Fechar Relatório
    </button>
    `;

    self.objectType = 'ParticipantReport';
    self.id = report._id;
    self.label = report.label;
    self.dirty = false;

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
    self.reloadReport = reloadReport;
    self.getLoadingMessage = getLoadingMessage;

    function expandAndCollapse() {
      self.status.expanded = !self.status.expanded;
      self.status.expandAndCollapseIcon = self.status.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
      if (self.status.expanded) getReportTemplate();
    }

    function getLoadingMessage() {
      return _loadingMessage;
    }

    function generateReport(callback) {
      DynamicReportService.openReportInNewTab(self, function () {
        callback();
      });
    }

    function reloadReport() {
      return getReportTemplate(true);
    }

    function getReportTemplate(forceReload) {
      if (self.dirty && !forceReload) {
        var defer = $q.defer();
        defer.resolve(true);
        return defer.promise;
      }
      self.dirty = true;

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

    function _manageDatasources(dataSourceList) {
      self.missingDataSources = [];


      dataSourceList.forEach(function (ds) {
        //todo: remove
        if (ds.dataSource === 'Activity') {
          ds.result[0] = {
            mode: "PAPER",
            statusHistory: statusHistories
          }
        }

        var dsKey = ds.key;

        DatasourceManagerFactory.manage(ds);

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

  //todo: remove
  var statusHistories = [
    {
      "objectType": "ActivityStatus",
      "name": "CREATED",
      "date": "2018-04-26T18:05:51.998Z",
      "user": {
        "name": "Fernando",
        "surname": "Souza",
        "phone": "51986402338",
        "email": "nando.souza97@hotmail.com"
      }
    },
    {
      "objectType": "ActivityStatus",
      "name": "INITIALIZED_OFFLINE",
      "date": "2017-09-06T18:04:46.882Z",
      "user": {
        "name": "Diogo",
        "surname": "Ferreira",
        "phone": "5193034655",
        "email": "diogo.rosas.ferreira@gmail.com"
      }
    },
    {
      "objectType": "ActivityStatus",
      "name": "OPENED",
      "date": "2018-04-26T18:05:56.370Z",
      "user": {
        "name": "Fernando",
        "surname": "Souza",
        "phone": "51986402338",
        "email": "nando.souza97@hotmail.com"
      }
    },
    {
      "objectType": "ActivityStatus",
      "name": "INITIALIZED_ONLINE",
      "date": "2018-04-26T18:05:57.619Z",
      "user": {
        "name": "Fernando",
        "surname": "Souza",
        "phone": "51986402338",
        "email": "nando.souza97@hotmail.com"
      }
    },
    {
      "objectType": "ActivityStatus",
      "name": "FINALIZED",
      "date": "2018-04-26T18:10:35.944Z",
      "user": {
        "name": "Fernando",
        "surname": "Souza",
        "phone": "51986402338",
        "email": "nando.souza97@hotmail.com"
      }
    }
  ];
}());
