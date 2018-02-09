(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .factory('otusjs.otus.uxComponent.ParticipantExamWidgetFactory', factory);


  factory.$inject = [
    '$q',
    'otusjs.otus.uxComponent.ParticipantExamService'
  ];

  function factory($q, ParticipantExamService) {
    var self = this;

    self.createExamList = createExamList;

    function createExamList() {
      var defer = $q.defer;
      ParticipantExamService.fetchExams()
        .then(function (data) {
          defer.resolve(data.exams.map(exam => new ParticipantExam(exam)));
        });
      return defer.promise;
    }
  }

  function ParticipantExam(examInfo) {
    var self = this;

    self.name = examInfo.name;
    self.isAvailable = null;
    self.hasBeenDelivered = examInfo.hasBeenDelivered;
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