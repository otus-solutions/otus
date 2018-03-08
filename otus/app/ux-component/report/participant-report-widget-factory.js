(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .factory('otusjs.otus.uxComponent.ParticipantReportWidgetFactory', factory);


  factory.$inject = [
    '$q',
    'otusjs.otus.uxComponent.ParticipantReportService'
  ];

  function factory($q, ParticipantExamService) {
    var self = this;

    self.getParticipantReportList = getParticipantReportList;

    function getParticipantReportList() {
      var defer = $q.defer();
      ParticipantExamService.fetchExams()
        .then(function (reports) {
          defer.resolve(reports.map(exam => new ParticipantReport(exam)));
        });
      return defer.promise;
    }

    return self;
  }

  function ParticipantReport(exam) {
    var self = Object.assign(this, exam); // exam pode ser um objeto gerado pelo model.
    // var self = exam;

    self.name = exam.name;
    self.isAvailable = null;  //null when we don't know yet if it's available
    self.hasBeenDelivered = exam.hasBeenDelivered;
    self.requestList = [];
    self.statusColor = self.isAvailable === true ? 'green' : 'red';
    self.statusIcon = self.isAvailable === true ? 'ok' : 'not_ok';

    self.setDependencies = setPromiseChain;


    function setPromiseChain(promise) {
      promise
        .then(function (data) {
          self.isAvailable = true;
          //do something with data;
        })
        .catch(function (e) {
          self.isAvailable = false;
          //do something with e
        });
    }
  }
}());