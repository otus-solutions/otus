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

    self.createExamList = createExamList;

    function createExamList() {
      var defer = $q.defer;
      ParticipantExamService.fetchExams()
        .then(function (reports) {
          defer.resolve(reports.map(exam => new ParticipantExam(exam)));
        });
      return defer.promise;
    }
  }

  function ParticipantExam(exam) {
    var self = Object.assign(this, exam); //extends. A ideia aqui é manter referência com o exam(que pode ser um objeto gerado pelo model).

    self.name = exam.name;
    self.isAvailable = null;  //null when we don't know yet if it's available
    self.hasBeenDelivered = exam.hasBeenDelivered;
    self.requestList = [];
    self.statusColor = self.isAvailable === true ? 'green' : 'red';

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