(function () {
  'use strict';

  angular
    .module('otusjs.report.business')
    .factory('otusjs.report.business.ParticipantReportWidgetFactory', factory);


  factory.$inject = [
    '$q',
    'otusjs.report.business.ParticipantReportService',
    'otusjs.otus.uxComponent.DynamicReportService'
  ];

  function factory($q, ParticipantReportService, DynamicReportService) {
    var self = this;

    self.getParticipantReportList = getParticipantReportList;

    function getParticipantReportList(rn) {
      var defer = $q.defer();
      ParticipantReportService.fetchReportList(rn)
        .then(function (reports) {
          defer.resolve(reports.map(function (report) {
            return new ParticipantReport(ParticipantReportService, DynamicReportService, report)
          }));
        });
      return defer.promise;
    }

    return self;
  }

  function ParticipantReport(ParticipantReportService, DynamicReportService, report) {
    var self = this;

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
    self.isAvailable = null;
    self.isAvailable = null;  //null when we don't know yet if it's available
    self.loading = false;
    self.status = {
      color: 'gray',
      icon: 'description',
      bottomIcon: '',
      bottomIconClass: '',
      tooltip: '',
      msg: ''
    };
    self.statusColor = 'gray';
    self.statusIcon = 'priority_high';

    self.getReportTemplate = getReportTemplate;
    self.reloadTemplate = reloadTemplate;


    function getReportTemplate() {
      self.loading = true;
      self.hasError = false;

      ParticipantReportService.getFullReport(self.id)
        .then(function (data) {
          _manageDatasources(data.dataSources);
          if(self.isAvailable){
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

    function _endLoading(){
      _setStatus();
      self.loading = false;
    }

    function _precompileTemplate(callback) {
      DynamicReportService.precompile().then(function(structure) {
        console.log(structure)
        self.compiledTemplate = structure.compiledTemplate;
        self.fieldsError = structure.fieldsError;
        if(self.fieldsError.length) self.hasError = true;
        _setAvailability(!self.hasError)
        callback();
      })
      .catch(function(erro) {
        callback();
      });
    }

    function reloadTemplate(){
      self.getReportTemplate();
    }

    function _manageDatasources(dataSourceList) {
      self.missingDataSources = [];

      dataSourceList.forEach(function (ds) {
        var dsKey = ds.key;
        if (ds.result.length > 0) {
          self.dataSources[dsKey] = ds.result;
        } else {
          self.missingDataSources.push(ds.label);
        }
      });
      self.hasAllDatasources = self.missingDataSources.length ? false : true;
    }

    function _setStatus() {      
      if(self.hasError){
        self.status = {
          color: '#CC6600',
          icon: 'priority_high',
          bottomIcon: 'help',
          bottomIconClass: '',
          tooltip: 'Não encontrado',
          msg: 'Não encontrado'
        };
      } else if(!self.hasAllDatasources){
        self.status = {
          color: 'red',
          icon: 'cancel',
          bottomIcon: 'block',
          bottomIconClass: '',
          tooltip: 'Indisponível',
          msg: 'Indisponível'
        };
      } else if(self.fieldsError.length){
        self.status = {
          color: 'red',
          icon: 'cancel',
          bottomIcon: 'block',
          bottomIconClass: '',
          tooltip: 'Indisponível',
          msg: 'Indisponível'
        };
      } else {
        self.status = {
          color: 'green',
          icon: 'done',
          bottomIcon: 'reply',
          bottomIconClass: 'iconInverted',
          tooltip: 'Visualizar',
          msg: 'Disponível'
        };
      }
      self.statusColor = self.isAvailable ? 'green' : 'red';
      self.statusIcon = self.isAvailable === true ? 'done' : 'cancel';
    }

    function _setAvailability(isAvailable) {
      self.isAvailable = isAvailable;
      self.statusColor = isAvailable === true ? 'green' : 'red';
      self.statusIcon = isAvailable === true ? 'done' : 'cancel';
    }
  }
}());
