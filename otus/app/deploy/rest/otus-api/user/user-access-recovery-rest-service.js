(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.UserAccessRecoveryRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.validateToken = validateToken;
    self.requestRecovery = requestRecovery;
    self.updatePassword = updatePassword;

    function initialize() {
      _rest = OtusRestResourceService.getOtusPasswordRecoveryResource();
    }

    function validateToken(token) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getValidationToken({
        token: token
      }).$promise;
    }

    function requestRecovery(userEmail, url) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.requestRecovery({
        userEmail: userEmail
      }, url).$promise;
    }

    function updatePassword(token, password) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.updatePassword({
        token: token
      }, password).$promise;
    }
  }
}());
