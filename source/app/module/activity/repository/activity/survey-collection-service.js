(function() {
  'use strict';

  angular
    .module('otusjs.activity.repository')
    .service('otusjs.activity.repository.SurveyCollectionService', Service);

  Service.$inject = [
    'otusjs.activity.core.ModuleService',
    'otusjs.deploy.SurveyRestService',
    'otusjs.deploy.SurveyGroupRestService'
  ];

  function Service(ModuleService, SurveyRestService, SurveyGroupRestService) {
    var self = this;

    /* Public methods */
    self.listAll = listAll;
    self.listAcronyms = listAcronyms;
    self.getSurveyGroupsByUser = getSurveyGroupsByUser;
    self.getSurveyByAcronym = getSurveyByAcronym;

    function listAll() {
      return _executeWork(function(dataSource) {
        return dataSource.getData().find();
      });
    }

    function listAcronyms() {
      return _executeWork(function(dataSource) {
        return dataSource.getData().find();
      });
    }

    function getSurveyByAcronym(acronym) {
      return SurveyRestService.getSurveyByAcronym(acronym);
    }

    function getSurveyGroupsByUser() {
      return SurveyGroupRestService.getSurveyGroupsByUser();
    }

    function _executeWork(work) {
      return ModuleService.whenSurveyDataSourceServiceReady().then(work);
    }
  }
}());
