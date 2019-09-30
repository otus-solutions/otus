(function () {
  'use strict';

  angular
    .module('otusjs.report.business')
    .factory('otusjs.report.business.ParticipantReportWidgetFactory', factory);


  factory.$inject = [
    '$q',
    'otusjs.report.business.ParticipantReportService',
    'otusjs.report.business.dynamicReport.DynamicReportService',
    'otusjs.report.business.datasource.DatasourceManagerFactory'
  ];

  function factory($q, ParticipantReportService, DynamicReportService, DatasourceManagerFactory) {
    var self = this;

    self.getParticipantReportList = getParticipantReportList;
    self.getActivityReport = getActivityReport;
    self.fromJson = fromJson;

    function getParticipantReportList(participant) {
      return ParticipantReportService.fetchReportList(participant)
        .then(function (reports) {
          return reports.map(function (report) {
            return new ParticipantReport($q, ParticipantReportService, DynamicReportService, DatasourceManagerFactory, report, participant)
          });
        });
    }

    function getActivityReport(participant, id) {
      return ParticipantReportService.fetchActivityReport(id)
        .then(function (report) {
          let mockReport = {"_id":"5be30a1f16da480067523dfb","template":"\n<otus-script>\n  {{data.date = helper.formatDate(ds.atividade[0].getInterviewDate())}}\n  {{data.participant = ds.participant[0]}}\n  {{data.sexo = data.participant.sex.toUpperCase() === 'F' ? 'Feminino' : 'Masculino'}}\n  {{data.nascimento = helper.formatDate(ds.participant[0].birthdate.value)}}\n  {{data.exam = ds.exam[0]}}\n  {{data.examObservation = data.exam.observations[0] ? data.exam.observations[0].value : \"\"}}\n  {{data.result = helper.getObjectByArray(ds.exam[0].examResults, {'resultName': 'Proteina C'})}}\n\n  {{ required('Resultado Proteina C', data.result, 'é obrigatório.') }}\n</otus-script>\n<div>\n  <style type=\"text/css\">\n    img {\n      display: block;\n      margin-left: auto;\n      margin-right: auto;\n      margin-bottom: 0.5cm;\n      width: 80mm;\n    }\n\n    hr {\n      border-top: 1.5pt solid #000000;\n    }\n\n    .footer{\n      width: 100%;\n      border-top: 2.0pt solid #000000;\n      font-family: \"Arial\", \"serif\";\n      font-size: 12px;\n      text-align: center;\n      position: absolute; \n    }\n\n    .footer-1{\n      top: 260mm;\n    }\n\n    .participantInfo {\n      display: flex;\n      border-bottom: 2.0pt solid #000000;\n      margin-bottom: 1.0cm;\n    }\n\n    .column {\n      flex: 20%;\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n      font-weight: bold;\n      margin-bottom: 0.1cm;\n    }\n\n    .contextValues {\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n      font-weight: bold;\n    }\n\n    .contextValues p:first-of-type {\n      font-size: 14px;\n    }\n\n    .contextObs {\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n    }\n\n    p{\n      margin: 0.5em 0;\n    }\n  </style>\n  <header>\n    <img src=\"http://wiki.inf.otus-solutions.com.br/images/d/d4/ELSA-logo.jpg\">\n  </header>\n\n  <section class=\"participantInfo\">\n    <section class=\"column\">\n      Nome: {{data.participant.name}}\n      <br> Sexo: {{data.sexo}}\n      <br> Data de Nascimento: {{data.nascimento}}\n      <br>\n    </section>\n    <section class=\"column\">\n      Número de Recrutamento: {{data.participant.recruitmentNumber}}\n      <br> Data da coleta: {{data.date}}\n    </section>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Proteína C Reativa ultra sensível - Soro</p>\n    <br/>\n    <p>PCR ultrassensível: {{data.result.value}} mg/L</p>\n    <br>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.examObservation\">\n      <p>Obs: {{data.examObservation}}</p>\n      <br>\n    </span>\n    <p>Metodologia: TURBIDIMETRIA</p>\n    <p>Valores de referência para avaliação em relação a risco cardiovascular:</p>\n    <p> Baixo risco: < 1.0 mg/L</p>\n    <p> Risco Intermediário: 1.0 a 3.0 mg/L</p>\n    <p> Alto risco: > 3.0 mg/L</p>\n    <br>\n    <hr>\n  </section>\n\n  <footer class=\"footer footer-1\">\n    <p>Responsável técnico: Ligia Maria Giongo Fedeli - CRF SP 10491</p>\n  </footer>\n\n</div>\n","label":"PCR (Lab. Central)","sender":"diogo.rosas.ferreira@gmail.com","sendingDate":"2018-11-07T15:51:59.246Z","fieldCenter":["SP","RS","RJ","MG","ES","BA"],"dataSources":[{"key":"participant","dataSource":"Participant","label":"Informações do participante","result":[{"recruitmentNumber":3051442,"name":"ANDRÉIA APARECIDA","sex":"F","birthdate":{"objectType":"ImmutableDate","value":"1977-05-04 00:00:00.000"},"fieldCenter":{"name":null,"code":null,"acronym":"MG","country":null,"state":null,"address":null,"complement":null,"zip":null,"phone":null,"backgroundColor":null,"borderColor":null}}],"optional":false},{"filters":{"acronym":"CSJ","category":"C0","statusHistory":{"name":"FINALIZED","position":-1}},"key":"atividade","dataSource":"Activity","label":"Formulario CSJ com status igual a finalizado","result":[{"statusHistory":[{"objectType":"ActivityStatus","name":"CREATED","date":"2018-05-07T18:44:10.846Z","user":{"name":"Ligia Maria","surname":"Giongo Fedeli","phone":"11981615707","email":"ligiamgfedeli@gmail.com"}},{"objectType":"ActivityStatus","name":"OPENED","date":"2018-05-09T20:18:12.708Z","user":{"name":"Diogo","surname":"Ferreira","phone":"5193034655","email":"diogo.rosas.ferreira@gmail.com"}},{"objectType":"ActivityStatus","name":"INITIALIZED_ONLINE","date":"2018-05-09T20:18:13.743Z","user":{"name":"Diogo","surname":"Ferreira","phone":"5193034655","email":"diogo.rosas.ferreira@gmail.com"}},{"objectType":"ActivityStatus","name":"FINALIZED","date":"2018-05-09T20:18:28.856Z","user":{"name":"Diogo","surname":"Ferreira","phone":"5193034655","email":"diogo.rosas.ferreira@gmail.com"}}],"mode":"ONLINE"}],"optional":false},{"filters":{"examName":"ELSA TURBISORO","fieldCenter":"SP"},"key":"exam","dataSource":"Exam","label":"Proteína C Reativa ultrasenssível","result":[null],"optional":false}]}
          let participantReport = new ParticipantReport($q, ParticipantReportService, DynamicReportService, DatasourceManagerFactory, report, participant);
          participantReport.load(mockReport.dataSources, report.template);
          return participantReport;
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
    self.load = load;

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
          load(data.dataSources, data.template);
        })
        .catch(function (e) {
          self.hasError = true;
          _setStatus();
          _endLoading();
        });
    }

    function load(dataSources, template) {
      self.loading = true;
      let defer = $q.defer();

      _manageDatasources(dataSources);
      _manageTemplate(template);
      if (self.hasAllDatasources) {
        _precompileTemplate(_endLoading)
          .then(defer.resolve())
          .catch(defer.resolve());
      } else {
        defer.resolve();
        _setStatus();
        _endLoading();
      }
    }

    function _endLoading() {
      self.loading = false;
    }

    function _precompileTemplate(callback) {
      return DynamicReportService.precompile(self)
        .then(function (structure) {
          self.compiledTemplate = structure.compiledTemplate;
          self.fieldsError = structure.fieldsError;
          _setStatus();
          callback();
        })
        .catch(function (error) {
          _setStatus();
          callback();
        });
    }

    function _manageDatasources(dataSourceList) {
      self.missingDataSources = [];
      self.missingOptionalDataSources = [];

      dataSourceList.forEach(function (ds) {
        DatasourceManagerFactory.manage(ds);

        if (ds.result[0]) {
          self.dataSources[ds.key] = ds.result;
        } else if (ds.optional) {
          self.missingOptionalDataSources.push(ds.label);
        } else {
          self.missingDataSources.push(ds.label);
        }
      });

      self.hasAllDatasources = !self.missingDataSources.length;
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
