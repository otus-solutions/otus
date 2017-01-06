(function() {
  'use strict';

  angular
    .module('otusjs.activity.repository')
    .service('otusjs.activity.repository.SurveyCollectionService', Service);

  Service.$inject = [
    'otusjs.activity.core.ModuleService'
  ];

  function Service(ModuleService) {
    var self = this;

    /* Public methods */
    self.listAll = listAll;

    function listAll() {
      return _executeWork(function(dataSource) {
        return dataSource.getData().find();
      });
    }

    function _executeWork(work) {
      return ModuleService.whenSurveyDataSourceServiceReady().then(work);
    }
  }
}());
