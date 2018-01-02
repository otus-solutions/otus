(function () {
  'use strict';

  angular
    .module('otusjs.laboratory.business.project.sending')
    .service('otusjs.laboratory.business.project.sending.SendingExamService', service);

  service.$inject = [
    'otusjs.laboratory.repository.ProjectRepositoryService'
  ];

  function service(ProjectRepositoryService) {
    var self = this;
    self.deleteLot = deleteLot;

    function deleteLot(send) {
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