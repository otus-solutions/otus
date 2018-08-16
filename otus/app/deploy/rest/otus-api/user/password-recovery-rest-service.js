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
    self.updatePassword = updatePassword;

    function initialize() {
      _rest = OtusRestResourceService.getOtusPasswordRecoveryResource();
    }

    function getRecovery(userEmail, url) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getRecovery({
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
