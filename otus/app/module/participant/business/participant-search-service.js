(function() {
  'use strict';

  angular
    .module('otusjs.participant.business')
    .service('otusjs.participant.business.ParticipantSearchService', Service);

  Service.$inject = [
    'otusjs.participant.core.ContextService',
    'otusjs.participant.core.EventService',
    'otusjs.participant.repository.ParticipantRepositoryService',
    'otusjs.utils.SearchQueryFactory',
    '$q'
  ];

  function Service(ContextService, EventService, ParticipantRepositoryService, SearchQueryFactory, $q) {
    var self = this;
    var _filteredParticipants = [];
    var query;

    /* Public methods */
    self.setup = setup;
    self.filter = filter;
    self.selectParticipant = selectParticipant;

    var _setupSuccess;

    function setup() {
      var defer = $q.defer();
      setTimeout(function() {
      var promise = ParticipantRepositoryService.listIdexers();
      promise.then(function(_participants) {
          if (_participants) {
            query = SearchQueryFactory.newParticipantFilter(_participants);
            _stringfyRNs(_participants);
            _setupSuccess = true;
            defer.resolve();
          } else {
            defer.reject();
          }
        });
      }, 1000);
      return defer.promise;
    }

    function _stringfyRNs(ds) {
      for (var i = 0; i < ds.length; i++) {
        ds[i].stringfiedRN = String(ds[i].recruitmentNumber);
      }
      query = SearchQueryFactory.newParticipantFilter(ds);
    }

    function filter(text) {
      if (!_setupSuccess) {
        setup();
      }
      return query.perform(text);
    }

    function selectParticipant(participant) {
      _filteredParticipants = [];
      ContextService.selectParticipant(participant);
      EventService.fireParticipantSelected(participant);
    }
  }
}());
