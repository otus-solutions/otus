(function() {
  'use strict';

  angular
    .module('otusjs.participant.business')
    .service('otusjs.participant.business.ParticipantSearchService', Service);

  Service.$inject = [
    'otusjs.participant.core.ContextService',
    'otusjs.participant.core.EventService',
    'otusjs.participant.repository.ParticipantRepositoryService',
    'otusjs.utils.SearchQueryFactory'
  ];

  function Service(ContextService, EventService, ParticipantRepositoryService, SearchQueryFactory) {
    var self = this;
    var _filteredParticipants = [];
    var query;

    /* Public methods */
    self.setup = setup;
    self.filter = filter;
    self.getAll = getAll;
    self.getFilteredData = getFilteredData;
    self.hasResultFilter = hasResultFilter;
    self.selectParticipant = selectParticipant;

    var _setupSuccess;

    function setup() {
      var _participants = ParticipantRepositoryService.listIdexers();
      if (_participants) {
        query = SearchQueryFactory.newParticipantFilter(_participants);
        _setupSuccess = true;
      }
    }

    function filter(text) {
      if (!_setupSuccess) {
        setup();
      }
      return query.perform(text);
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
