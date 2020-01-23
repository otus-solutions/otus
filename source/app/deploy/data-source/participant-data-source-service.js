(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ParticipantDataSourceService', Service);

  Service.$inject = [
    '$q',
    'otusjs.deploy.ParticipantRestService',
    'otusjs.deploy.ProjectConfigurationRestService',
    'otusjs.participant.storage.ParticipantStorageService'
  ];

  function Service($q, ParticipantRestService, ProjectConfigurationRestService, ParticipantStorageService) {
    var self = this;
    var _loadingDefer = $q.defer();

    /* Public methods */
    self.up = up;
    self.listIndexers = listIndexers;
    self.create = create;
    self.getAllowNewParticipants = getAllowNewParticipants;
    self.getFollowUps = getFollowUps;

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

    function _loadData() {
      ParticipantRestService
        .list()
        .then(function (response) {
          ParticipantStorageService.getCollection().clear();
          ParticipantStorageService.getCollection().insert(response.data);
          ParticipantStorageService.save();
          _loadingDefer.resolve();
        });
    }
  }
}());
