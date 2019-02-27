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
    self.listSurveysGroups = listSurveysGroups;

    function initialize() {
      _rest = OtusRestResourceService.getSurveyResource();
    }

    function listSurveysGroups() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }

      var request = $q.defer();

      _rest
        .listSurveysGroups()
        .$promise
        .then(function(response) {
          if (response.data && response.data.length) {
            request.resolve(response.data);
          } else {
            request.resolve([]);
          }
        });
      // request.resolve(respostaFake.data);

      return request.promise;
    }

    var respostaFake =  {
      "data": [
        {
          "_id": "5c7400d2d767afded0d84dcf",
          "objectType": "SurveyGroup",
          "name": "CI",
          "surveyAcronyms": [
            "ACTA",
            "AMAC",
            "CISE"
          ]
        },
        {
          "_id": "5c7400d2d767afded0d84dcf",
          "objectType": "SurveyGroup",
          "name": "CD",
          "surveyAcronyms": [
            "BIOC",
            "AMAC",
            "CFUC"
          ]
        }
      ]
    };


  }
}());
