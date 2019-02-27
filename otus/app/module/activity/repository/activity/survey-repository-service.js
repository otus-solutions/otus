(function () {
  'use strict';

  angular
    .module('otusjs.activity.repository')
    .service('otusjs.activity.repository.SurveyRepositoryService', Service);

  Service.$inject = [
    'otusjs.activity.repository.SurveyCollectionService'
  ];

  function Service(SurveyCollectionService) {
    var self = this;
    var _existsWorkingInProgress = null;

    /* Public methods */
    self.listSurveysGroups = listSurveysGroups;

    function listSurveysGroups() {
      return SurveyCollectionService.listSurveysGroups();
    }

  }
}());
