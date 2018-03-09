(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .factory('otusjs.otus.uxComponent.ParticipantReportWidgetFactory', factory);


  factory.$inject = [
    '$q',
    'otusjs.otus.uxComponent.ParticipantReportService'
  ];

  function factory($q, ParticipantReportService) {
    var self = this;

    self.getParticipantReportList = getParticipantReportList;

    function getParticipantReportList() {
      var defer = $q.defer();
      ParticipantReportService.fetchReportList()
        .then(function (reports) {
          defer.resolve(reports.map(function(exam) {new ParticipantReport($q, ParticipantReportService, exam)}));
        });
      return defer.promise;
    }

    return self;
  }

  function ParticipantReport($q, ParticipantReportService, exam) {
    // todo: decidir pelo tipo de inicialização
    // var self = Object.assign(this, exam); // exam pode ser um objeto gerado pelo model.
    // var self = exam;
    var self = this;

    self.id = exam.id;
    self.name = exam.name;
    self.hasBeenDelivered = exam.hasBeenDelivered; //will this come at first consult?

    self.template = '';
    self.dataSources = {};

    //ux-properties
    self.isAvailable = null;  //null when we don't know yet if it's available
    self.loading = false;
    self.statusColor = 'gray';
    self.statusIcon = 'priority_high';

    self.getReportTemplate = getReportTemplate;


    function getReportTemplate() {
      var defer = $q.defer();

      self.loading = true;
      // LoadingScreenService.start();
      ParticipantReportService.getFullReport(self.id)
        .then(function(data) {
          console.log(data);
          if (data) {
            _manageDatasources(data.dataSources);
          }
          self.loading = false;
          defer.resolve(true);  //necessary?
        })
        .catch(function (e) {
          console.log(e);
          self.loading = false;
          defer.reject(false);
        });

        return defer.promise;
    }

    function _manageDatasources(dataSourceList) {
      var missing = [];

      dataSourceList.forEach(function (ds) {
        var dsKey = ds.key;
        if (ds.result.length > 0) {
          self.dataSources[dsKey] = ds.result;
        } else {
          missing.push(dsKey);
        }
      });
      if(missing.length > 0){
        _setAvailability(false);
      }else{
        _setAvailability(true);
      }
    }

    function _setAvailability(isAvailable){
      self.isAvailable = isAvailable;
      self.statusColor = isAvailable === true ? 'green' : 'red';
      self.statusIcon = isAvailable === true ? 'done' : 'cancel';
    }
  }
}());
