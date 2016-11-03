(function() {
  'use strict';

  angular
    .module('otusjs.otus.participant.searchEngine')
    .service('ParticipantSearchResultService', Service);

  Service.$inject = [
    '$http',
    '$filter'
  ];

  function Service($http, $filter) {
    var self = this;
    var _filteredParticipants = [];
    var _participants = [];

    /* Public methods */
    self.filter = filter;
    self.getAll = getAll;
    self.getFiltered = getFiltered;

    _init();

    function _init() {
      $http.get('app/assets/static-resources/participants_dummy.json').success(function(data) {
        _participants = data;
      });
    }

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
