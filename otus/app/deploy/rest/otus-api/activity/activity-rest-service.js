(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ActivityRestService', Service);

  Service.$inject = [
    'OtusRestResourceService',
    '$http'
  ];

  function Service(OtusRestResourceService, $http) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.update = update;
    self.list = list;
    self.remove = remove;

    function initialize() {
      _rest = OtusRestResourceService.getActivityResource();
    }

    function update(data) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.update(data).$promise;
    }

    function list() {
      // if (!_rest) {
      //   throw new Error('REST resource is not initialized.');
      // }
      // return _rest.list().$promise;
      return $http.get('app/deploy/data-source/file/activities.json');
    }

    function remove(data) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.remove(data).$promise;
    }
  }
}());
