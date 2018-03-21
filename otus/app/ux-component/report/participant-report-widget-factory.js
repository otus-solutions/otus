(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .factory('otusjs.otus.uxComponent.ParticipantReportWidgetFactory', factory);


  factory.$inject = [
    '$q',
    'otusjs.otus.uxComponent.ParticipantReportService',
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
            return new ParticipantReport($q, ParticipantReportService, DynamicReportService, report)
          }));
        });
      return defer.promise;
    }

    return self;
  }

  function ParticipantReport($q, ParticipantReportService, DynamicReportService, report) {
    // todo: decidir pelo tipo de inicialização
    // var self = Object.assign(this, report); // report pode ser um objeto gerado pelo model.
    // var self = report;
    var self = this;

    self.id = report.id;
    self.name = report.name;
    self.hasBeenDelivered = report.hasBeenDelivered; //will this come at first consult?

    self.template = '';
    self.dataSources = {};
    self.missingDataSources = [];
    self.fieldsError = [];
    self.compiledTemplate = undefined;
    self.hasError = false;

    //ux-properties
    self.isAvailable = null;  //null when we don't know yet if it's available
    self.loading = false;
    self.statusColor = 'gray';
    self.statusIcon = 'priority_high';

    self.getReportTemplate = getReportTemplate;


    function getReportTemplate() {
      self.loading = true;
      self.hasError = false;

      ParticipantReportService.getFullReport(self.id)
        .then(function (data) {
          console.log(data);
          _manageDatasources(data.dataSources);
          _precompileTemplate(function(){
            self.loading = false;
          });
        })
        .catch(function (e) {
          self.hasError = true;
          self.loading = false;
        });
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
      if (self.missingDataSources.length > 0) {
        _setAvailability(false);
      } else {
        _setAvailability(true);
      }
    }

    function _setAvailability(isAvailable) {
      self.isAvailable = isAvailable;
      self.statusColor = isAvailable === true ? 'green' : 'red';
      self.statusIcon = isAvailable === true ? 'done' : 'cancel';
    }
  }
}());
