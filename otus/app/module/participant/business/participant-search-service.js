(function() {
  'use strict';

  angular
    .module('otusjs.participant.business')
    .service('otusjs.participant.business.ParticipantSearchService', Service);

  Service.$inject = [
    '$filter',
    'otusjs.participant.core.ContextService',
    'otusjs.participant.core.EventService',
    'otusjs.participant.repository.ParticipantRepositoryService',
  ];

  function Service($filter, ContextService, EventService, ParticipantRepositoryService) {
    var self = this;
    var _filteredParticipants = [];

    /* Public methods */
    self.filter = filter;
    self.getAll = getAll;
    self.getFilteredData = getFilteredData;
    self.hasResultFilter = hasResultFilter;
    self.selectParticipant = selectParticipant;

    function filter(query) {
      var participants = ParticipantRepositoryService.listIdexers();
      if (query) {
        _filteredParticipants = $filter('participantQuick')(participants, query);
      } else {
        _filteredParticipants = [];
      }
    }

    function getAll() {
      return ParticipantRepositoryService.listIdexers();
    }

    function getFilteredData() {
      return _filteredParticipants;
    }

    function hasResultFilter() {
      return _filteredParticipants.length > 0;
    }

    function selectParticipant(participant) {
      _filteredParticipants = [];
      ContextService.selectParticipant(participant);
      EventService.fireParticipantSelected(participant);
    }
  }
}());
