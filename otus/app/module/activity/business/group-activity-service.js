(function () {
  'use strict';

  angular
    .module('otusjs.activity.business')
    .service('otusjs.activity.business.GroupActivityService', Service);

  Service.$inject = [
    'otusjs.activity.repository.SurveyRepositoryService'
  ];

  function Service(SurveyRepositoryService) {
    var self = this;

    /* Public methods */
     self.listSurveysGroups = listSurveysGroups;

    function listSurveysGroups() {
      return SurveyRepositoryService.listSurveysGroups();
    }


  }
}());
