(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.AuthenticationRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.authenticate = authenticate;
    self.authenticateProject = authenticateProject;
    self.invalidate = invalidate;

    function initialize() {
      _rest = OtusRestResourceService.getOtusAuthenticatorResource();
    }

    function authenticate(userData) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.authenticate(userData).$promise;
    }

    function authenticateProject(projectData) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.authenticate(projectData).$promise;
    }

    function invalidate() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.invalidate().$promise;
    }
  }
}());
