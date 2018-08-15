(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.PasswordRecoveryRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.getRecovery = getRecovery;
    self.getTokenValidation = getTokenValidation;
    self.updatePassword = updatePassword;

    function initialize() {
      _rest = OtusRestResourceService.getOtusAuthenticatorResource();
    }

    function getRecovery(userEmail) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getRecovery({ userEmail: userEmail }).$promise;
    }

    function getTokenValidation(token) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getTokenValidation({ token: token }).$promise;
    }

    function updatePassword(recruitmentNumber, updateStructure) {
      if (!_participantRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _participantRest.updatePassword({
        token: token
      }, password).$promise;
    }
  }
}());
