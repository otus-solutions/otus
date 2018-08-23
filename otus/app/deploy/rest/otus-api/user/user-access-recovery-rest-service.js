(function () {
  'use strict';

  angular
    .module('otusjs.deploy.user')
    .service('otusjs.deploy.user.UserAccessRecoveryRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.validateToken = validateToken;
    self.sendPasswordReset = sendPasswordReset;
    self.updatePassword = updatePassword;

    function initialize() {
      _rest = OtusRestResourceService.getPasswordResetResource();
    }

    function validateToken(token) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.validationToken({ token: token }).$promise;
    }

    function sendPasswordReset(data) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.requestRecovery({}, data).$promise;
    }

    function updatePassword(data) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.updatePassword({}, data).$promise;
    }
  }
}());
