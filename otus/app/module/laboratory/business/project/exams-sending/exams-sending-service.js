(function () {
  'use strict';

  angular
    .module('otusjs.laboratory.business.project.sending')
    .service('otusjs.laboratory.business.project.sending.SendingExamService', service);

  service.$inject = [
    '$q',
    'otusjs.laboratory.exam.sending.ExamResultLotSerive',
    'otusjs.laboratory.repository.ProjectRepositoryService',
    'otusjs.deploy.LoadingScreenService'
  ];

  function service($q, ExamResultLotSerive, ProjectRepositoryService, LoadingScreenService) {
    var self = this;
    var messageLoading =
      'Por favor aguarde o carregamento da lista de envio.<br> Esse processo pode demorar um pouco...';

    /* Public methods */
    self.createExamSending = createExamSending;
    self.loadExamSendingFromJson = loadExamSendingFromJson;
    self.getSendedExams = getSendedExams;
    self.createSendExam = createSendExam;
    self.deleteSendedExams = deleteSendedExams;

    function createExamSending() {
      return ExamResultLotSerive.createExamSending();
    }

    function loadExamSendingFromJson(examResultLot, examResults) {
      return ExamResultLotSerive.buildExamSendingFromJson(examResultLot, examResults);
    }

    function getSendedExams() {
      LoadingScreenService.changeMessage(messageLoading);
      LoadingScreenService.start();
      var deferred = $q.defer();

      ProjectRepositoryService.getSendedExams()
        .then(function (response) {
          deferred.resolve(response);
          LoadingScreenService.finish();
        })
        .catch(function (err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }

    function createSendExam(sendStructure) {
      var deferred = $q.defer();

      ProjectRepositoryService.createSendExam(sendStructure)
        .then(function (response) {
          deferred.resolve(JSON.parse(response));
        })
        .catch(function (err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }

    function deleteSendedExams(send) {
      var deferred = $q.defer();

      ProjectRepositoryService.deleteSendedExams(send)
        .then(function (response) {
          deferred.resolve(JSON.parse(response));
        })
        .catch(function (err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }
  }
}());