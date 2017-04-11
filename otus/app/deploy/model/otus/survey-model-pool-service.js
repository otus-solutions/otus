(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.model.SurveyModelPoolService', Service);

  Service.$inject = [
    '$injector'
  ];

  function Service($injector) {
    var self = this;
    var BASE_NAME = '';
    var _models = [];

    /* Public methods */
    self.getModels = getModels;

    _loadModels();

    function getModels() {
      return _models;
    }

    function _loadModels() {
      _models = _models.concat([
        _modelLookup('SurveyFactory'),
        _modelLookup('SurveyFormFactory'),
        _modelLookup('SurveyIdentityFactory'),
        _modelLookup('SurveyMetaInfoFactory')
      ]);
    }

    function _modelLookup(modelName) {
      return $injector.get(BASE_NAME + modelName);
    }
  }
}());
