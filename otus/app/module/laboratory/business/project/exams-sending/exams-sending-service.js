(function () {
  'use strict';

  angular
    .module('otusjs.laboratory.business.project.sending')
    .service('otusjs.laboratory.business.project.sending.SendingExamService', service);

  service.$inject = [
    '$q',
    'otusjs.laboratory.repository.ProjectRepositoryService',
    'otusjs.deploy.LoadingScreenService'
  ];

  function service($q, ProjectRepositoryService, LoadingScreenService) {
    var self = this;
    var messageLoading =
      'Por favor aguarde o carregamento da lista de envio.<br> Esse processo pode demorar um pouco...';

    self.getSendedExams = getSendedExams;
    self.createSendExam = createSendExam;
    self.deleteSendingExam = deleteSendingExam;

    function getSendedExams() {
      LoadingScreenService.changeMessage(messageLoading);
      LoadingScreenService.start();
      var deferred = $q.defer();

      ProjectRepositoryService.getSendedExams()
        .then(function (response) {
          deferred.resolve(JSON.parse(response));
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

    function deleteSendingExam(send) {
      var deferred = $q.defer();

      ProjectRepositoryService.deleteSendingExam(send)
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