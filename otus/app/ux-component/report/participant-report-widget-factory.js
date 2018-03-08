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
          defer.resolve(reports.map(exam => new ParticipantReport(ParticipantReportService, exam)));
        });
      return defer.promise;
    }

    return self;
  }

  function ParticipantReport(ParticipantReportService, exam) {
    //todo: decidir pelo tipo de inicialização
    var self = Object.assign(this, exam); // exam pode ser um objeto gerado pelo model.
    // var self = exam;
    // var self = this;

    self.id = exam.id;
    self.name = exam.name;
    self.hasBeenDelivered = exam.hasBeenDelivered;
    self.getReportTemplate = getReportTemplate;

    //ux-properties
    self.isAvailable = null;  //null when we don't know yet if it's available
    self.loading = false;
    self.statusColor = self.isAvailable === true ? 'green' : 'red';
    self.statusIcon = self.isAvailable === true ? 'done' : 'cancel';



    function getReportTemplate(){
      self.loading = true;
      ParticipantReportService.getFullReport(self.id)
        .then(data => {
          console.log(data);
          self.loading = false;
        })
        .catch(function(e){
          console.log(e);
          self.loading = false;
        });
    }
  }
}());
