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

    self.getSendingForExams = getSendingForExams;
    self.createSendExam = createSendExam;
    self.deleteSendingExam = deleteSendingExam;

    function getSendingForExams() {
      LoadingScreenService.changeMessage(messageLoading);
      LoadingScreenService.start();
      var deferred = $q.defer();

      LaboratoryConfigurationService.fetchAliquotsDescriptors()
        .then(function () {
          ProjectRepositoryService.getSendingForExams()
            .then(function (response) {
              var lots = JSON.parse(response).map(function (lotJson) {
                return ExamService.buildAliquotLotFromJson(
                  lotJson);
              });
              deferred.resolve(lots);
              LoadingScreenService.finish();
            })
            .catch(function (err) {
              deferred.reject(err);
            });
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