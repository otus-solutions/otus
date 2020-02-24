(function () {
  'use strict';

  angular
    .module('otusjs.laboratory.business.unattached')
    .service('otusjs.laboratory.business.unattached.UnattachedLaboratoryService', Service);

  Service.$inject = [
    '$q',
    'otusjs.laboratory.repository.LaboratoryRepositoryService',
    'otusjs.laboratory.core.ContextService',
  ];

  function Service($q, LaboratoryRepositoryService, ContextService) {
    var self = this;

    self.attacheLaboratory = attacheLaboratory;
    self.attacheLaboratoryToParticipant = attacheLaboratoryToParticipant;
    self.createUnattached = createUnattached;
    self.listUnattached = listUnattached;
    self.getById = getById;
    self.discardUnattached = discardUnattached;
    self.getUnattachedByIdentification = getUnattachedByIdentification;

    function attacheLaboratory(laboratoryIdentification) {
      var request = $q.defer();
      getSelectedParticipant()
        .then(function (participant) {
          self.participant = participant;
          return LaboratoryRepositoryService
            .attacheLaboratory(participant.recruitmentNumber, laboratoryIdentification)
            .then(function () {
              request.resolve();
            }).catch(function (e) {
              request.reject(e);
            });
        });
      return request.promise;
    }

    function attacheLaboratoryToParticipant(laboratoryIdentification, recruitmentNumber) {
      var request = $q.defer();

      LaboratoryRepositoryService
        .attacheLaboratory(recruitmentNumber, laboratoryIdentification)
        .then(function () {
          request.resolve();
        }).catch(function (e) {
        request.reject(e);
      });

      return request.promise;
    }

    function createUnattached(fieldCenterAcronym, collectGroupName) {
      var request = $q.defer();

      LaboratoryRepositoryService
        .createUnattached(fieldCenterAcronym, collectGroupName)
        .then(function (result) {
          request.resolve(result);
        }).catch(function (e) {
        request.reject(e);
      });

      return request.promise;
    }

    function listUnattached(collectGroupName, center, page, quantity) {
      var request = $q.defer();

      LaboratoryRepositoryService
        .listUnattached(collectGroupName, center, page, quantity)
        .then(function (result) {
          request.resolve(result);
        }).catch(function (e) {
        request.reject(e);
      });

      return request.promise;
    }

    function getById(laboratoryOid) {
      var request = $q.defer();

      LaboratoryRepositoryService
        .getUnattachedById(laboratoryOid)
        .then(function (result) {
          request.resolve(result);
        }).catch(function (e) {
        request.reject(e);
      });

      return request.promise;
    }

    function discardUnattached(laboratoryOid) {
      var request = $q.defer();

      LaboratoryRepositoryService
        .discardUnattached(laboratoryOid)
        .then(function (result) {
          request.resolve(result);
        }).catch(function (e) {
        request.reject(e);
      });

      return request.promise;
    }


    function getUnattachedByIdentification(laboratoryIdentification) {
      var request = $q.defer();

      LaboratoryRepositoryService
        .getUnattachedByIdentification(laboratoryIdentification)
        .then(function (result) {
          request.resolve(result);
        }).catch(function (e) {
        request.reject(e);
      });

      return request.promise;
    }

    function getSelectedParticipant() {
      return ContextService.getSelectedParticipant();
    }
  }
}());
