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
    self.createParticipantContact = createParticipantContact;
    self.getParticipantContact = getParticipantContact;
    self.getByRecruitmentNumberPaticipantContact = getByRecruitmentNumberPaticipantContact;
    self.addNonMainEmail = addNonMainEmail;
    self.addNonMainAddress = addNonMainAddress;
    self.addNonMainPhoneNumber = addNonMainPhoneNumber;
    self.updateEmail = updateEmail;
    self.updateAddress = updateAddress;
    self.updatePhoneNumber = updatePhoneNumber;
    self.swapMainContact = swapMainContact;
    self.deleteParticipantContact = deleteParticipantContact;
    self.deleteNonMainContact = deleteNonMainContact;

    function initialize() {
      _rest = OtusRestResourceService.getParticipantContactResource();
    }

    function createParticipantContact(jsonParticipant) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.create(jsonParticipant).$promise;
    }

    function getParticipantContact(id) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.get({id: id}).$promise;
    }

    function getByRecruitmentNumberPaticipantContact(rn) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.getByRecruitmentNumber({rn:rn}).$promise;
    }

    function addNonMainEmail(jsonParticipant) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.addNonMainEmail(jsonParticipant).$promise;
    }

    function addNonMainAddress(jsonParticipant) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.addNonMainAddress(jsonParticipant).$promise;
    }

    function addNonMainPhoneNumber(jsonParticipant) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.addNonMainPhoneNumber(jsonParticipant).$promise;
    }

    function updateEmail(jsonParticipant) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.updateEmail(jsonParticipant).$promise;
    }

    function updateAddress(jsonParticipant) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.updateAddress(jsonParticipant).$promise;
    }

    function updatePhoneNumber(jsonParticipant) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.updatePhoneNumber(jsonParticipant).$promise;
    }

    function swapMainContact(jsonParticipant) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.swapMainContact(jsonParticipant).$promise;
    }

    function deleteParticipantContact(id) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.delete({id:id}).$promise;
    }

    function deleteNonMainContact(jsonParticipant) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.deleteNonMainContact(jsonParticipant).$promise;
    }
  }
}());