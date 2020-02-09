(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ConfigurationRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.getSurveys = getSurveys;
    self.getSurveyByAcronym = getSurveyByAcronym;

    function initialize() {
      _rest = OtusRestResourceService.getConfigurationResource();
    }

    function getSurveys() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.getSurveys().$promise;
    }

    function getSurveyByAcronym(acronym) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.getByAcronym({acronym: acronym}).$promise;
    }
  }
}());
