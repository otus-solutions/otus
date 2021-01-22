(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ParticipantContactAttemptRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    const UNINITIALIZED_REST_ERROR_MESSAGE = 'REST resource is not initialized.';
    const self = this;
    let _rest = null;

    self.initialize = initialize;
    self.create = create;
    self.deleteContactAttempt = deleteContactAttempt;
    self.findByRnByContactTypeByPosition = findByRnByContactTypeByPosition;
    self.findAttemptConfigurationByObjectType = findAttemptConfigurationByObjectType;
    self.updateAttemptAddress = updateAttemptAddress;
    self.changeAttemptAddress = changeAttemptAddress;

    function initialize() {
      _rest = OtusRestResourceService.getParticipantContactAttemptResource();
    }

    function create(attemptJson) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.create(attemptJson).$promise;
    }

    function deleteContactAttempt(id) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.delete({id:id}).$promise;
    }

    function findByRnByContactTypeByPosition(rn, contactType, position) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      return _rest.findByRnByContactTypeByPosition({rn: rn, contactType: contactType, position: position}).$promise;
    }

    function findAttemptConfigurationByObjectType(objectType) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      const resp = _rest.findAttemptConfigurationByObjectType({objectType: objectType});
      return resp.$promise;
    }

    function updateAttemptAddress(rn, contactType, position, addressJson) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      const resp = _rest.updateAttemptAddress({rn: rn, contactType: contactType, position: position}, addressJson);
      return resp.$promise;
    }

    function changeAttemptAddress(rn, contactType, position) {
      if(!_rest) throw new Error(UNINITIALIZED_REST_ERROR_MESSAGE);
      const resp = _rest.changeAttemptAddress({rn: rn, contactType: contactType, position: position});
      return resp.$promise;
    }
  }
}());