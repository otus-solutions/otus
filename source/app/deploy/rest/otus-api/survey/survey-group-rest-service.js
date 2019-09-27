(function() {
  'use strict';

  angular
    .module('otusjs.deploy.rest')
    .service('otusjs.deploy.SurveyGroupRestService', Service);

  Service.$inject = [
    'OtusRestResourceService',
    '$q'
  ];

  function Service(OtusRestResourceService, $q) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.getSurveyGroupsByUser = getSurveyGroupsByUser;

    function initialize() {
      _rest = OtusRestResourceService.getSurveyGroupResource();
    }

    function getSurveyGroupsByUser() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }

      var request = $q.defer();

      _rest
        .getSurveyGroupsByUser()
        .$promise
        .then(function(response) {
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
