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
    self.update = update;
    self.listIdexers = listIdexers;
    self.getAllowNewParticipants = getAllowNewParticipants;
    self.filter = filter;
    self.selectParticipant = selectParticipant;
    self.getSelectedParticipant = getSelectedParticipant;
    self.getParticipantList = getParticipantList;
    self.getParticipant = getParticipant;
    self.createParticipantContact = createPaticipantContact;
    self.getParticipantContact = getParticipantContact;
    self.getByRecruitmentNumber = getByRecruitmentNumber;
    self.updateMainContact = updateMainContact;
    self.addSecondaryContact = addSecondaryContact;
    self.updateSecondaryContact = updateMainContact;
    self.swapMainContactWithSecondary = swapMainContactWithSecondary;
    self.deleteParticipantContact = deleteParticipantContact;
    self.deleteSecondaryContact = deleteSecondaryContact;

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

    function update(participant) {
      var deferred = $q.defer();
      ParticipantRepositoryService.update(participant)
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

    function createPaticipantContact(partcipantContact) {
      return ParticipantRepositoryService.createPaticipantContact(partcipantContact);
    }

    function getParticipantContact(id) {
      return ParticipantRepositoryService.getParticipantContact(id);
    }

    function getByRecruitmentNumber(rn) {
      return ParticipantRepositoryService.getByRecruitmentNumberPaticipantContact(rn);
    }

    function updateMainContact(partcipantContact) {
      return ParticipantRepositoryService.updateMainContact(partcipantContact);
    }

    function addSecondaryContact(partcipantContact) {
      return ParticipantRepositoryService.addSecondaryContact(partcipantContact);
    }

    function updateSecondaryContact(partcipantContact) {
      return ParticipantRepositoryService.updateSecondaryContact(partcipantContact);
    }

    function swapMainContactWithSecondary(partcipantContact) {
      return ParticipantRepositoryService.swapMainContactWithSecondary(partcipantContact);
    }

    function deleteParticipantContact(id) {
      return ParticipantRepositoryService.deleteParticipantContact(id);
    }

    function deleteSecondaryContact(id) {
      return ParticipantRepositoryService.deleteSecondaryContact(id);
    }
  }
}());
