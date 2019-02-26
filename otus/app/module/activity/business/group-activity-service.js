(function () {
  'use strict';

  angular
    .module('otusjs.activity.business')
    .service('otusjs.activity.business.GroupActivityService', Service);

  Service.$inject = [
    'otusjs.activity.core.ContextService',
    'otusjs.activity.repository.ActivityRepositoryService',
    'otusjs.survey.GroupManagerFactory'
  ];

  function Service(ContextService, ActivityRepositoryService) {
    var self = this;

    /* Public methods */
     self.listSurveysGroups = listSurveysGroups;

    function listSurveysGroups() {
      return ActivityRepositoryService.listSurveysGroups();
    }


  }
}());
