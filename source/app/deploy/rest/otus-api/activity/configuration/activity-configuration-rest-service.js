(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ActivityConfigurationRestService', Service);

  Service.$inject = [
    '$q',
    'OtusRestResourceService'
  ];

  function Service($q, OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.list = list;

    function initialize() {
      _rest = OtusRestResourceService.getActivityConfigurationResource();
    }

    function list() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }

      var request = $q.defer();

      _rest
        .listAll()
        .$promise
        .then(function (response) {
          if (response.data && response.data.length) {
            request.resolve(response.data);
          } else {
            request.resolve([]);
          }
        });

      return request.promise;
    }

  }
}());
