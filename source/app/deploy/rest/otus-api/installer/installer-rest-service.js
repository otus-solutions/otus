(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.InstallerRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.ready = ready;
    self.config = config;
    self.validateEmail = validateEmail;

    function initialize() {
      _rest = OtusRestResourceService.getOtusInstallerResource();
    }

    function ready(callback) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }

      _rest.ready(callback);
    }

    function config(callback) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }

      _rest.config(callback);
    }

    function validateEmail(email) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }

      return _rest.validateEmail(email).$promise;
    }
  }
}());
