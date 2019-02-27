(function () {
  'use strict';

  angular
    .module('otusjs.activity.repository')
    .service('otusjs.activity.repository.SurveyRepositoryService', Service);

  Service.$inject = [
    '$q',
    'otusjs.activity.core.ModuleService',
    'otusjs.activity.core.ContextService',
    'otusjs.activity.repository.SurveyCollectionService'
  ];

  function Service($q, ModuleService, ContextService, SurveyCollectionService) {
    var self = this;
    var _existsWorkingInProgress = null;

    /* Public methods */
    self.listSurveysGroups = listSurveysGroups;

    function listSurveysGroups() {
      return SurveyCollectionService.listSurveysGroups();
    }

  }
}());
