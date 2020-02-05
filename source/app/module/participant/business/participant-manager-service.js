(function () {
  'use strict';

  angular
    .module('otusjs.participant.business')
    .service('otusjs.participant.business.ParticipantManagerService', Service);

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
    var participantList = [];

    /* Public methods */
    self.setup = setup;
    self.create = create;
    self.listIdexers = listIdexers;
    self.getAllowNewParticipants = getAllowNewParticipants;
    self.filter = filter;
    self.selectParticipant = selectParticipant;
    self.getSelectedParticipant = getSelectedParticipant;
    self.getParticipantList = getParticipantList;
    self.getParticipant = getParticipant;
    var _setupSuccess;

    function setup() {
      var defer = $q.defer();
      setTimeout(function () {
        var promise = ParticipantRepositoryService.listIdexers();
        promise.then(function (participants) {
          if (participants) {
            query = SearchQueryFactory.newParticipantFilter(participants);
            _stringfyRNs(participants);
            participantList = participants;
            _setupSuccess = true;
            defer.resolve(_setupSuccess);
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

    function getSelectedParticipant() {
      return ContextService.getSelectedParticipant();
    }

    function create(participant) {
      var deferred = $q.defer();
      ParticipantRepositoryService.create(participant)
        .then(function (response) {
          deferred.resolve(response);
        })
        .catch(function (err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }

    function listIdexers() {
      var deferred = $q.defer();
      ParticipantRepositoryService.listIdexers()
        .then(function (response) {
          deferred.resolve(response);
        })
        .catch(function (err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }

    function getAllowNewParticipants() {
      var deferred = $q.defer();
      ParticipantRepositoryService.getAllowNewParticipants()
        .then(function (response) {
          deferred.resolve(response);
        })
        .catch(function (err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }

    function getParticipantList() {
      return participantList;
    }

    function getParticipant(rn) {
      let participant = participantList.find(element => element.recruitmentNumber === rn);
      if(!participant){
        throw new Error('ParticipantList is not initialized.');
      }
      return participant;
    }
  }
}());
