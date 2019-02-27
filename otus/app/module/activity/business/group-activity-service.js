(function () {
  'use strict';

  angular
    .module('otusjs.activity.business')
    .service('otusjs.activity.business.GroupActivityService', Service);

  Service.$inject = [
    'otusjs.activity.core.ContextService',
    'otusjs.activity.repository.SurveyRepositoryService',
    'otusjs.survey.GroupManagerFactory'
  ];

  function Service(ContextService, SurveyRepositoryService) {
    var self = this;

    /* Public methods */
     self.listSurveysGroups = listSurveysGroups;

    function listSurveysGroups() {
      return SurveyRepositoryService.listSurveysGroups();
    }


  }
}());
