(function () {
  'use strict';

  angular
    .module('otusjs.participant.business')
    .service('otusjs.participant.business.ParticipantFollowupService', Service);

  Service.$inject = [
    '$q',
    'otusjs.participant.repository.ParticipantRepositoryService'
  ];

  function Service($q, ParticipantRepositoryService) {
    var self = this;

    self.getFollowups = getFollowups;

    function getFollowups(recruitmentNumber) {
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
  }
}());
