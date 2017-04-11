(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.model.ActivityModelPoolService', Service);

  Service.$inject = [
    '$injector'
  ];

  function Service($injector) {
    var self = this;
    var BASE_NAME = 'otusjs.model.activity.';
    var _models = [];

    /* Public methods */
    self.getModels = getModels;

    _loadModels();

    function getModels() {
      return _models;
    }

    function _loadModels() {
      _models = _models.concat([
        _modelLookup('ActivityParticipantDataFactory'),
        _modelLookup('ActivityStatusFactory'),
        _modelLookup('ActivityFactory'),
        _modelLookup('ActivityUserFactory'),
        _modelLookup('AnswerFillFactory'),
        _modelLookup('InterviewFactory'),
        _modelLookup('InterviewerFactory')
      ]);
    }

    function _modelLookup(modelName) {
      return $injector.get(BASE_NAME + modelName);
    }
  }
}());
