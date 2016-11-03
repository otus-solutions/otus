(function() {
  'use strict';

  angular
    .module('otusjs.otus.participant.searchEngine')
    .service('ParticipantSearchResultService', Service);

  Service.$inject = [
    '$filter',
    'otusjs.otus.participant.context.ParticipantContextService'
  ];

  function Service($filter, ParticipantContextService) {
    var self = this;
    var _filteredParticipants = [];
    var _participants = ParticipantContextService.getPreList();

    /* Public methods */
    self.filter = filter;
    self.getAll = getAll;
    self.getFiltered = getFiltered;

    function filter(query) {
      if (query) {
        _filteredParticipants = $filter('participantQuick')(_participants, query);
      } else {
        _filteredParticipants = [];
      }
    }

    function getAll() {
      return _participants;
    }

    function getFiltered() {
      return _filteredParticipants;
    }
  }
}());
