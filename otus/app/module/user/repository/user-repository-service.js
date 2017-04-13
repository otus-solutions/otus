(function() {
  'use strict';

  angular
    .module('otusjs.user.business')
    .service('otusjs.user.business.UserRepositoryService', Service);

  Service.$inject = [
    'otusjs.user.core.ModuleService',
    'otusjs.user.core.EventService',
  ];

  function Service(ModuleService, EventService) {
    var self = this;

    /* Public methods */
    self.listIdexers = listIdexers;

    function get() {}

    function list() {}

    function add() {}

    function remove() {}

    function update() {}

    function listIdexers() {
      // console.log(ModuleService.DataSource.User);
      return [];
    }
  }
}());
