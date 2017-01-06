(function() {
  'use strict';

  angular
    .module('otusjs.participant.repository')
    .service('otusjs.participant.repository.ParticipantRepositoryService', Service);

  Service.$inject = [
    'otusjs.participant.core.ModuleService'
  ];

  function Service(ModuleService) {
    var self = this;
    var _dataSource = ModuleService.DataSource.Participant;

    /* Public methods */
    self.listIdexers = listIdexers;

    function get() {}

    function list() {}

    function add() {}

    function remove() {}

    function update() {}

    function listIdexers() {
      return _dataSource.listIndexers();
    }
  }
}());
