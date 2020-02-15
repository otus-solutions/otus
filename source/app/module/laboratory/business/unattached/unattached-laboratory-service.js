(function () {
  'use strict';

  angular
    .module('otusjs.laboratory.business.unattached')
    .service('otusjs.laboratory.business.unattached.UnattachedLaboratoryService', Service);

  Service.$inject = [
    '$q',
    'otusjs.laboratory.repository.LaboratoryRepositoryService',
    'otusjs.laboratory.core.ContextService'
  ];

  function Service($q, LaboratoryRepositoryService, ContextService) {
    var self = this;

    self.attacheLaboratory = attacheLaboratory;

    function attacheLaboratory(laboratoryIdentification) {
      var request = $q.defer();
      getSelectedParticipant()
        .then(function (participant) {
          self.participant = participant;
              return LaboratoryRepositoryService
                .attacheLaboratory(participant.recruitmentNumber,laboratoryIdentification)
                .then(function () {
                  request.resolve();
                }).catch(function (e) {
                  request.reject(e);
                });
        });
      return request.promise;
    }

    function getSelectedParticipant() {
      return ContextService.getSelectedParticipant();
    }
  }
}());
