(function () {
  'use strict';

  angular
    .module('otusjs.activity.business')
    .service('otusjs.activity.business.ActivityImportService', Service);

  Service.$inject = [
    'otusjs.activity.repository.ActivityRepositoryService'
  ];

  function Service(ActivityRepositoryService) {
    var self = this;

    /* Public methods */
    self.importActivities = importActivities;

    function importActivities(surveyActivities, version) {
      return ActivityRepositoryService.importActivities(surveyActivities, version)
    }

  }
}());
