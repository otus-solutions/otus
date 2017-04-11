(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.UserRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.create = create;
    self.logged = logged;
    self.list = list;
    self.listIdexers = listIdexers;
    self.enable = enable;
    self.disable = disable;
    self.listIdexers = listIdexers;

    function initialize() {
      _rest = OtusRestResourceService.getUserResource();
    }

    function create(userData) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }

      return _rest.create(userData).$promise;
    }

    function logged(userData) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }

      return _rest.logged(userData).$promise;
    }

    function list() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }

      return _rest.list().$promise;
    }

    function listIdexers() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.list().$promise;
    }

    function enable(user) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }

      return _rest.enable(user).$promise;
    }

    function disable(user) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }

      return _rest.disable(user).$promise;
    }
  }
}());
