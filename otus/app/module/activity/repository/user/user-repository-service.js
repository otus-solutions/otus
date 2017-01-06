(function() {
  'use strict';

  angular
    .module('otusjs.activity.repository')
    .service('otusjs.activity.repository.UserRepositoryService', Service);

  Service.$inject = [
    '$q',
    'otusjs.activity.core.ModuleService',
    'otusjs.activity.core.ContextService',
    'otusjs.activity.core.EventService'
  ];

  function Service($q, ModuleService, ContextService, EventService) {
    var self = this;

    /* Public methods */
    self.listAll = listAll;

    function listAll() {
      return ModuleService.DataSource.User.listIndexers();
    }
  }
}());
