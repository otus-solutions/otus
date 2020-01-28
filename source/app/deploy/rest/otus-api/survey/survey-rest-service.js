(function() {
  'use strict';

  angular
    .module('otusjs.deploy.rest')
    .service('otusjs.deploy.SurveyRestService', Service);

  Service.$inject = [
    'OtusRestResourceService',
    '$q'
  ];

  function Service(OtusRestResourceService, $q) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.list = list;
    self.listAll = listAll;
    self.getSurveyByAcronym = getSurveyByAcronym;

    function initialize() {
      _rest = OtusRestResourceService.getSurveyResource();
    }

    function list() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }

      var request = $q.defer();

      _rest
        .list()
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

    function listAll() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }

      var request = $q.defer();

      _rest
        .listAll()
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

    function getSurveyByAcronym(acronym) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.getSurveys({acronym: acronym}).$promise;
    }


  }
}());
