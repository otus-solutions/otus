(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ParticipantDataSourceService', Service);

  Service.$inject = [
    '$q',
    'otusjs.deploy.ParticipantRestService',
    'otusjs.model.participant.ParticipantFactory',
    'otusjs.deploy.ProjectConfigurationRestService',
    'otusjs.participant.storage.ParticipantStorageService'
  ];

  function Service($q, ParticipantRestService, ParticipantFactory, ProjectConfigurationRestService, ParticipantStorageService) {
    var self = this;
    var _loadingDefer = $q.defer();

    /* Public methods */
    self.up = up;
    self.listIndexers = listIndexers;
    self.create = create;
    self.update = update;
    self.getAllowNewParticipants = getAllowNewParticipants;
    self.getFollowUps = getFollowUps;
    self.activateFollowUpEvent = activateFollowUpEvent;
    self.deactivateFollowUpEvent = deactivateFollowUpEvent;
    self.requestPasswordReset = requestPasswordReset;
    self.requestPasswordResetLink = requestPasswordResetLink;
    self.updateLoginEmail = updateLoginEmail;
    self.removeEmailByParticipantId = removeEmailByParticipantId;

    function up() {
      _loadingDefer = $q.defer();
      _initializeSources();
      _loadData();
      return _loadingDefer.promise;
    }

    function listIndexers() {
      var defer = $q.defer();
      _loadingDefer.promise
        .then(function () {
          defer.resolve(ParticipantStorageService.getCollection().find());
        });
      return defer.promise;
    }

    function _initializeSources() {
      ParticipantRestService.initialize();
      ProjectConfigurationRestService.initialize();
    }

    function create(participant) {
      var deferred = $q.defer();
      ParticipantRestService
        .create(participant)
        .then(function (response) {
          deferred.resolve(response.data);
          _loadData();
        }).catch(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }

    function update(participant) {
      var deferred = $q.defer();
      ParticipantRestService
        .update(participant)
        .then(function (response) {
          deferred.resolve(response.data);
          _loadData();
        }).catch(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }

    function getAllowNewParticipants() {
      var deferred = $q.defer();
      ProjectConfigurationRestService
        .getProjectConfiguration()
        .then(function (response) {
          deferred.resolve(response.data);
        }).catch(function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function getFollowUps(recruitmentNumber) {
      var deferred = $q.defer();
      ParticipantRestService
        .getFollowUps(recruitmentNumber)
        .then(function (response) {
          deferred.resolve(response.data);
        }).catch(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }

    function activateFollowUpEvent(recruitmentNumber, event) {
      var deferred = $q.defer();
      ParticipantRestService
        .activateFollowUpEvent(recruitmentNumber, event)
        .then(function (response) {
          deferred.resolve(response.data);
        }).catch(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }

    function deactivateFollowUpEvent(followUpId) {
      var deferred = $q.defer();
      ParticipantRestService
        .deactivateFollowUpEvent(followUpId)
        .then(function (response) {
          deferred.resolve(response.data);
        }).catch(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }

    function _loadData() {
      ParticipantRestService
        .list()
        .then(function (response) {
          ParticipantStorageService.getCollection().clear();
          let _participants = ParticipantFactory.fromArray(response.data);
          ParticipantStorageService.getCollection().insert(_participants);
          ParticipantStorageService.save();
          _loadingDefer.resolve();
        });
    }

    function requestPasswordReset(email) {
     return ParticipantRestService.requestPasswordReset(email);
    }

    function requestPasswordResetLink(email) {
      let deferred = $q.defer();
      ParticipantRestService.requestPasswordResetLink(email)
        .then(function(response){
          deferred.resolve(response.data);
        })
        .catch(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
    }

    function updateLoginEmail(participantId, updatedLoginEmail) {
      return ParticipantRestService.updateLoginEmail(participantId, updatedLoginEmail);
    }

    function removeEmailByParticipantId(participantId){
      return ParticipantRestService.removeEmailByParticipantId(participantId);
    }
  }
}());
