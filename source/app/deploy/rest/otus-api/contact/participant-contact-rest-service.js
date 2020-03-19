(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ParticipantContactRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    const UNINITIALIZED_REST_ERROR_MESSAGE = 'REST resource is not initialized.';
    const self = this;
    let _rest = null;

    self.initialize = initialize;
    self.createParticipantContact = createPaticipantContact;
    self.getParticipantContact = getParticipantContact;
    self.getByRecruitmentNumberPaticipantContact = getByRecruitmentNumberPaticipantContact;
    self.updateMainContact = updateMainContact;
    self.addSecondaryContact = addSecondaryContact;
    self.updateSecondaryContact = updateMainContact;
    self.swapMainContactWithSecondary = swapMainContactWithSecondary;
    self.deleteParticipantContact = deleteParticipantContact;
    self.deleteSecondaryContact = deleteSecondaryContact;

    function initialize() {
      _rest = OtusRestResourceService.getParticipantContactResource();
    }

    function createPaticipantContact(jsonParticipant) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.create(jsonParticipant).$promise;
    }

    function getParticipantContact(id) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.get(id).$promise;
    }

    function getByRecruitmentNumberPaticipantContact(rn) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.getByRecruitmentNumber(rn).$promise;
    }

    function updateMainContact(jsonParticipant) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.updateMainContact(jsonParticipant).$promise;
    }

    function addSecondaryContact(jsonParticipant) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.addSecondaryContact(jsonParticipant).$promise;
    }

    function updateSecondaryContact(jsonParticipant) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.updateSecondaryContact(jsonParticipant).$promise;
    }

    function swapMainContactWithSecondary(jsonParticipant) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.swapMainContactWithSecondary(jsonParticipant).$promise;
    }

    function deleteParticipantContact(id) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.delete(id).$promise;
    }

    function deleteSecondaryContact(id) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.deleteSecondaryContact(id).$promise;
    }
  }
}());