(function () {
  'use strict';

  angular
    .module('otusjs.participant.business')
    .service('otusjs.participant.business.ParticipantFollowUpService', Service);

  Service.$inject = [
    '$q',
    'otusjs.participant.repository.ParticipantRepositoryService'
  ];

  function Service($q, ParticipantRepositoryService) {
    var self = this;

    self.getFollowUps = getFollowUps;
    self.activateFollowUpEvent = activateFollowUpEvent;
    self.deactivateFollowUpEvent = deactivateFollowUpEvent;

    function getFollowUps(recruitmentNumber) {
      var deferred = $q.defer();
      ParticipantRepositoryService.getFollowUps(recruitmentNumber)
        .then(function (response) {
          deferred.resolve(response);
        })
        .catch(function (err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }

    function activateFollowUpEvent(recruitmentNumber, event) {
      var deferred = $q.defer();
      ParticipantRepositoryService.activateFollowUpEvent(recruitmentNumber, event)
        .then(function (response) {
          deferred.resolve(response);
        })
        .catch(function (err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }

    function deactivateFollowUpEvent(followUpId) {
      var deferred = $q.defer();
      ParticipantRepositoryService.deactivateFollowUpEvent(followUpId)
        .then(function (response) {
          deferred.resolve(response);
        })
        .catch(function (err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }
  }
}());
